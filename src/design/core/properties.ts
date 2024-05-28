enum DisplayProperties {
  none = 'none',
  flex = 'flex',
  inline = 'inline',
  block = 'block',
  'inline-block' = 'inline-block'
}
export type DisplayProperty = keyof typeof DisplayProperties;

export enum LayoutDirections {
  horizontal = 'horizontal',
  vertical = 'vertical'
}
export type LayoutDirection = keyof typeof LayoutDirections;

enum FloatProperties {
  left = 'left',
  right = 'right',
  none = 'none',
  inherit = 'inherit'
}
export type FloatProperty = keyof typeof FloatProperties;

enum OverflowProperties {
  scroll = 'scroll',
  hidden = 'hidden',
  auto = 'auto',
  visible = 'visible'
}
export type OverflowProperty = keyof typeof OverflowProperties;

enum PositionProperties {
  absolute = 'absolute',
  relative = 'relative',
  fixed = 'fixed',
  sticky = 'sticky',
  static = 'static',
  initial = 'initial',
  inherit = 'inherit'
}
export type PositionProperty = keyof typeof PositionProperties;

enum TextAlignProperties {
  center = 'center',
  left = 'left',
  right = 'right',
  justify = 'justify'
}
export type TextAlignProperty = keyof typeof TextAlignProperties;
