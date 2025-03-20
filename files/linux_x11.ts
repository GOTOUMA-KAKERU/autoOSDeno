    // X11 ライブラリを読み込む
    const libX11 = Deno.dlopen("libX11.so.6", {
        // ディスプレイを開く関数の定義
        XOpenDisplay: {
        parameters: ["pointer"],
        result: "pointer",
        },
        XDefaultRootWindow: {
            parameters: ["pointer"],  // Display *
            result: "u64",            // Window ID（値）
        },
        // ディスプレイを閉じる関数の定義
        XCloseDisplay: {
        parameters: ["pointer"],
        result: "i32",
        },
        // マウスの座標を取得する関数の定義
        XQueryPointer: {
            parameters: ["pointer", "u64", "buffer", "buffer", "buffer", "buffer", "buffer", "buffer", "buffer"],
            result: "i32",
        },
        // マウスの座標を変更する関数の定義
        XWarpPointer: {
            parameters: ["pointer", "u64", "u64", "i32", "i32", "u32", "u32", "i32", "i32"],
            result: "i32",
        },
        // Xサーバーに描画を反映する関数の定義
        XFlush: { 
            parameters: ["pointer"], 
            result: "i32" 
        }
    });
    
    // libXTest ライブラリを読み込む
    const libXTest = Deno.dlopen("libXtst.so.6", {
        XTestFakeButtonEvent: {
            parameters: ["pointer", "u32", "i32", "u64"],
            result: "i32",
        },
        });
    
    // Xサーバーに接続
    const display = libX11.symbols.XOpenDisplay(null);
    
    // ルートウィンドウを取得
    const rootWindow = libX11.symbols.XDefaultRootWindow(display);

export function GetMouse(){
    // マウスの座標取得の引数(実行後に座標が入る)
    const rootReturn = new BigUint64Array(1);
    const childReturn = new BigUint64Array(1);
    const rootX = new Int32Array(1);
    const rootY = new Int32Array(1);
    const winX = new Int32Array(1);
    const winY = new Int32Array(1);
    const maskReturn = new Uint32Array(1);

    // XQueryPointer を実行
    libX11.symbols.XQueryPointer(display,rootWindow,rootReturn,childReturn,rootX,rootY,winX,winY,maskReturn,);

        return [rootX[0], rootY[0]];
}
export function MoveMouse(dest_x: number, dest_y: number){

    // マウスカーソルを移動する
    const src_x = 0; // 移動元のX座標
    const src_y = 0; // 移動元のY座標
    const src_width = 0; // 移動元の幅
    const src_height = 0; // 移動元の高さ

    libX11.symbols.XWarpPointer(display,rootWindow,rootWindow,src_x,src_y,src_width,src_height,dest_x,dest_y);

    console.log("Moved mouse to", dest_x, dest_y);
    libX11.symbols.XFlush(display);
    return 0;

}

export function ClickMouse(button: number){
    libXTest.symbols.XTestFakeButtonEvent(display, button, 1, BigInt(0));
    libX11.symbols.XFlush(display);
    // ボタン解放をシミュレート
    libXTest.symbols.XTestFakeButtonEvent(display, button, 0, BigInt(0));
    libX11.symbols.XFlush(display);
    return 0;
}

export function ChangeMouse(button: number,doing: number){
    libXTest.symbols.XTestFakeButtonEvent(display, button, doing, BigInt(0));
    libX11.symbols.XFlush(display);
    return 0;
}