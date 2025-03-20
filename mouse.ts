import * as forlinux from "./files/linux_x11.ts";

const osType = Deno.build.os;

if (osType !== "linux") {
    console.log("現在はlinuxのみ対応しています。");
    Deno.exit(1);
}

export function GetMouse(){
    if(osType == "linux"){
        const mouseposition = forlinux.GetMouse();
        return mouseposition;
    }
}

export function MoveMouse(dest_x: number, dest_y: number){
    if(osType == "linux"){
        forlinux.MoveMouse(dest_x, dest_y);
    }
    return 0;
}