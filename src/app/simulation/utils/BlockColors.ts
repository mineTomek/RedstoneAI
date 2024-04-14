export default function generateColors(colorGroup: number) {
  return [
    MinecraftColors.White,
    MinecraftColors.LightGray,
    MinecraftColors.DarkGray,
    MinecraftColors.Black,
    MinecraftColors.Red,
    MinecraftColors.Orange,
    MinecraftColors.Yellow,
    MinecraftColors.LimeGreen,
    MinecraftColors.Green,
    MinecraftColors.LightBlue,
    MinecraftColors.Cyan,
    MinecraftColors.Blue,
    MinecraftColors.Purple,
    MinecraftColors.Magenta,
    MinecraftColors.Pink,
    MinecraftColors.Brown,
  ][colorGroup] as number
}

export enum MinecraftColors {
  White = 0xeeeeee,
  LightGray = 0xa0a7a7,
  DarkGray = 0x414141,
  Black = 0x181414,
  Red = 0x9e2b27,
  Orange = 0xea7e35,
  Yellow = 0xc2b51c,
  LimeGreen = 0x39ba2e,
  Green = 0x364b18,
  LightBlue = 0x6387d2,
  Cyan = 0x267191,
  Blue = 0x253193,
  Purple = 0x7e34bf,
  Magenta = 0xbe49c9,
  Pink = 0xd98199,
  Brown = 0x56331c,
}
