/*
// X11 ライブラリを読み込む
const libX11 = Deno.dlopen("libX11.so.6", {
    // マウスカーソルを移動する関数の定義
    XWarpPointer: {
      parameters: ["pointer", "u32", "u32", "u32", "i32", "i32", "u32", "i32", "i32"],
      result: "i32",
    },
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
    }
});

    // Xサーバーに接続
    const display = libX11.symbols.XOpenDisplay(null);
    
    // ルートウィンドウを取得
    const rootWindow = libX11.symbols.XDefaultRootWindow(display);


    // マウスの座標取得の引数(実行後に座標が入る)
    const rootReturn = new BigUint64Array(1);
    const childReturn = new BigUint64Array(1);
    const rootX = new Int32Array(1);
    const rootY = new Int32Array(1);
    const winX = new Int32Array(1);
    const winY = new Int32Array(1);
    const maskReturn = new Uint32Array(1);

    // XQueryPointer を実行
    const result = libX11.symbols.XQueryPointer(display,rootWindow,rootReturn,childReturn,rootX,rootY,winX,winY,maskReturn,);

    if (result) {
        console.log(`Mouse Position: (${rootX[0]}, ${rootY[0]})`);
    } else {
        console.log("Failed to get mouse position");
    }
*/
export function GetMouse(){
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
        }
    });

        // Xサーバーに接続
        const display = libX11.symbols.XOpenDisplay(null);
    
        // ルートウィンドウを取得
        const rootWindow = libX11.symbols.XDefaultRootWindow(display);
    
    
        // マウスの座標取得の引数(実行後に座標が入る)
        const rootReturn = new BigUint64Array(1);
        const childReturn = new BigUint64Array(1);
        const rootX = new Int32Array(1);
        const rootY = new Int32Array(1);
        const winX = new Int32Array(1);
        const winY = new Int32Array(1);
        const maskReturn = new Uint32Array(1);
    
        // XQueryPointer を実行
        const result = libX11.symbols.XQueryPointer(display,rootWindow,rootReturn,childReturn,rootX,rootY,winX,winY,maskReturn,);
    
        if (result) {
            return [rootX[0], rootY[0]];
        } else {
            return 1;
        }
}