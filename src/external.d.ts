// These classes, functions and variables are not part of the code but are
// included in external libraries, imports or are added to the final bundle
// by the build.sh build process.
//
// This makes sure VS Code knows about them and they can be used in the
// project.
//
// https://stackoverflow.com/a/13087849 - thanks!

interface dummyFunction { (): any; }
interface zzfxFunction { (...parameters): any; }

declare var coilInit: dummyFunction;

declare var na: dummyFunction; // nearActive
declare var ni: dummyFunction; // nearInit
declare var nl: dummyFunction; // nearLogin
declare var nt: dummyFunction; // nearTip
declare var nn: string; // _nearNetName

declare var io: dummyFunction; // socket.io

declare var zzfx: zzfxFunction;
