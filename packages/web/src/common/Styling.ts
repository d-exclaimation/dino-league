/**
 * Tailwind color text typing
 */
export namespace Color {
  /**
   * Tailwind Hue options
   */
  export type Hue =
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

  /**
   * Tailwindd Lightness options
   */
  export type Lightness =
    | "50"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";

  /**
   * Base tailwind color options, "{hue}-{lightness}"
   */
  export type Base = `${Hue}-${Lightness}` | "white" | "black";

  /**
   * Tailwind color type template
   */
  export type of<T extends string> = `${T}-${Base}`;

  /**
   * Tailwind text color type
   */
  export type Text = `text-${Base}`;

  /**
   * Tailwind background color type
   */
  export type Bg = `bg-${Base}`;

  /**
   * Tailwind decoration color type
   */
  export type Decoration = `decoration-${Base}`;
}
