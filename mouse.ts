import * as forlinux_x11 from "./files/linux_x11.ts";

const osType = Deno.build.os;

if (osType !== "linux") {
    console.log("現在はlinuxのみ対応しています。");
    Deno.exit(1);
}

export function GetMouse(){
    if(osType == "linux"){
        const mouseposition = forlinux_x11.GetMouse();
        return mouseposition;
    }
}

export function MoveMouse(dest_x: number, dest_y: number){
    if(osType == "linux"){
        forlinux_x11.MoveMouse(dest_x, dest_y);
    }
    return 0;
}

export function ClickMouse(button: number){
    if(osType == "linux"){
        forlinux_x11.ClickMouse(button);
    }
    return 0;
}
export function ChangeMouse(button: number){
    if(osType == "linux"){
        const mouseposition = forlinux_x11.ChangeMouse(button);
        return mouseposition;
    }
}