
const kebabCase = require('lodash/string').kebabCase

const spacing = {
  '0': '0',
  '1': '0.3125rem', // 5px
  '2': '0.625rem', // 10px
  '2.2': '0.6875rem', // 11px
  '2.4': '0.75rem', // 12px
  '2.8': '0.875rem', // 14px
  '3': '0.9375rem', // 15px
  '3.2': '1rem', // 16px
  '3.4': '1.0625rem', // 17px
  '3.6': '1.125rem', // 18px
  '3.8': '1.1875rem', // 19px
  '4': '1.25rem', // 20px
  '4.2': '1.3125rem', // 21px
  '4.4': '1.375rem', // 22px
  '4.6': '1.4375rem', // 23px
  '5': '1.5625rem', // 25px
  '5.2': '1.625rem', // 26px
  '5.8': '1.8125rem', // 29px
  '6': '1.875rem', // 30px
  '6.8': '2.0625rem', // 33px
  '8': '2.5rem', // 40px
  '10': '3.125rem', // 50px
  '11': '5rem', // 80px,
  '12': '6.25rem', // 100px,
  '16': '8.75rem', // 140px,
}


module.exports = {
  /*
    |-----------------------------------------------------------------------------
    | Screens                      https://tailwindcss.com/docs/responsive-design
    |-----------------------------------------------------------------------------
    |
    | Screens in Tailwind are translated to CSS media queries. They define the
    | responsive breakpoints for your project. By default Tailwind takes a
    | "mobile first" approach, where each screen size represents a minimum
    | viewport width. Feel free to have as few or as many screens as you
    | want, naming them in whatever way you'd prefer for your project.
    |
    | Tailwind also allows for more complex screen definitions, which can be
    | useful in certain situations. Be sure to see the full responsive
    | documentation for a complete list of options.
    |
    | Class name: .{screen}:{utility}
    |
    */

  screens: {
    xxs: '360px',
    xs: '576px',
    sm: '768px',
    md: '1025px',
    lg: '1180px',
    xl: '1367px',
    until_xs: { max: '575px' },
    until_sm: { max: '767px' },
    until_md: { max: '1024px' },
  },

  /*
    It's not native tailwind variables, needed to compile custom 'container' plugin
  */
  breakpoints: {
    tablet: {
      bp: '768px',
      width: '768px',
    },
    desktop: {
      bp: '980px',
      width: '1218px',
    },
  },

  /*
    |-----------------------------------------------------------------------------
    | Font weights                       https://tailwindcss.com/docs/font-weight
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your font weights. We've provided a list of
    | common font weight names with their respective numeric scale values
    | to get you started. It's unlikely that your project will require
    | all of these, so we recommend removing those you don't need.
    |
    | Class name: .font-{weight}
    |
    */

  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  /*
    |-----------------------------------------------------------------------------
    | Leading (line height)              https://tailwindcss.com/docs/line-height
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your line height values, or as we call
    | them in Tailwind, leadings.
    |
    | Class name: .leading-{size}
    |
    */

  leading: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    loose: 2,

    '16px': '1rem',
    '18px': '1.125rem',
    '20px': '1.25rem',
    '28px': '1.75rem',
  },

  /*
    |-----------------------------------------------------------------------------
    | Width                                    https://tailwindcss.com/docs/width
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your width utility sizes. These can be
    | percentage based, pixels, rems, or any other units. By default
    | we provide a sensible rem based numeric scale, a percentage
    | based fraction scale, plus some other common use-cases. You
    | can, of course, modify these values as needed.
    |
    |
    | It's also worth mentioning that Tailwind automatically escapes
    | invalid CSS class name characters, which allows you to have
    | awesome classes like .w-2/3.
    |
    | Class name: .w-{size}
    |
    */

  width: {
    auto: 'auto',
    px: '1px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '15': '3.4rem',
    '16': '4rem',
    '24': '6rem',
    '32': '8rem',
    '48': '12rem',
    '64': '16rem',
    '96': '17rem',
    '128': '20rem',
    '1/2': '50%',
    '1/3': '33.33333%',
    '2/3': '66.66667%',
    '1/4': '25%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.66667%',
    '5/6': '83.33333%',
    full: '100%',
    screen: '100vw',
  },

  /*
    |-----------------------------------------------------------------------------
    | Height                                  https://tailwindcss.com/docs/height
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your height utility sizes. These can be
    | percentage based, pixels, rems, or any other units. By default
    | we provide a sensible rem based numeric scale plus some other
    | common use-cases. You can, of course, modify these values as
    | needed.
    |
    | Class name: .h-{size}
    |
    */

  height: {
    auto: 'auto',
    px: '1px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '3.6': '1.125rem', // 18px
    '4': '1rem',
    '5': '1.25rem',
    '5.2': '1.625rem', // 26px
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '11': '2.75rem',
    '12': '3rem',
    '15': '3.4rem',
    '16': '4rem',
    '18': '4.5rem',
    '20': '5rem',
    '22': '5.5rem',
    '24': '6rem',
    '32': '8rem',
    '48': '12rem',
    '64': '16rem',
    '128': '18rem',
    full: '100%',
    screen: '100vh',
    half: '50vh',
  },

  /*
    |-----------------------------------------------------------------------------
    | Minimum width                        https://tailwindcss.com/docs/min-width
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your minimum width utility sizes. These can
    | be percentage based, pixels, rems, or any other units. We provide a
    | couple common use-cases by default. You can, of course, modify
    | these values as needed.
    |
    | Class name: .min-w-{size}
    |
    */

  minWidth: {
    '0': '0',
    full: '100%',
  },

  /*
    |-----------------------------------------------------------------------------
    | Minimum height                      https://tailwindcss.com/docs/min-height
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your minimum height utility sizes. These can
    | be percentage based, pixels, rems, or any other units. We provide a
    | few common use-cases by default. You can, of course, modify these
    | values as needed.
    |
    | Class name: .min-h-{size}
    |
    */

  minHeight: {
    '0': '0',
    '1': '1rem',
    '2': '2rem',
    full: '100%',
    screen: '100vh',
  },

  /*
    |-----------------------------------------------------------------------------
    | Maximum width                        https://tailwindcss.com/docs/max-width
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your maximum width utility sizes. These can
    | be percentage based, pixels, rems, or any other units. By default
    | we provide a sensible rem based scale and a "full width" size,
    | which is basically a reset utility. You can, of course,
    | modify these values as needed.
    |
    | Class name: .max-w-{size}
    |
    */

  maxWidth: {
    none: 'none',
    '2xs': '9rem',
    '3xs': '11rem',
    xxs: '15rem',
    xs: '20rem',
    sm: '30rem',
    md: '40rem',
    lg: '50rem',
    xl: '60rem',
    '2xl': '70rem',
    '3xl': '80rem',
    '4xl': '90rem',
    '5xl': '100rem',
    full: '100%',
    '1/2': '50%',
    '1/3': '33.33333%',
    '2/3': '66.66667%',
    '1/4': '25%',
    '3/4': '75%',
  },

  /*
    |-----------------------------------------------------------------------------
    | Maximum height                      https://tailwindcss.com/docs/max-height
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your maximum height utility sizes. These can
    | be percentage based, pixels, rems, or any other units. We provide a
    | couple common use-cases by default. You can, of course, modify
    | these values as needed.
    |
    | Class name: .max-h-{size}
    |
    */

  maxHeight: {
    full: '100%',
    screen: '100vh',
  },

  /*
    |-----------------------------------------------------------------------------
    | Padding                                https://tailwindcss.com/docs/padding
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your padding utility sizes. These can be
    | percentage based, pixels, rems, or any other units. By default we
    | provide a sensible rem based numeric scale plus a couple other
    | common use-cases like "1px". You can, of course, modify these
    | values as needed.
    |
    | Class name: .p{side?}-{size}
    |
    */

  padding: spacing,

  /*
    |-----------------------------------------------------------------------------
    | Margin                                  https://tailwindcss.com/docs/margin
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your margin utility sizes. These can be
    | percentage based, pixels, rems, or any other units. By default we
    | provide a sensible rem based numeric scale plus a couple other
    | common use-cases like "1px". You can, of course, modify these
    | values as needed.
    |
    | Class name: .m{side?}-{size}
    |
    */

  margin: {
    ...spacing,
    auto: 'auto',
    px: '1px',
    '0': '0',
    '1': '0.3125rem', // 5px
    '1.8': '0.5625rem', // 9px
    '2': '0.625rem', // 10px
    '3': '0.9375rem', // 15px
    '4': '1.25rem', // 20px
    '5': '1.5625rem', // 25px
    '6': '1.875rem', // 30px
    '7': '2rem', // 32px;
    '8': '2.5rem', // 40px
    '10': '3.125rem', // 50px
    '12': '3.5rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
  },

  /*
    |-----------------------------------------------------------------------------
    | Negative margin                https://tailwindcss.com/docs/negative-margin
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your negative margin utility sizes. These can
    | be percentage based, pixels, rems, or any other units. By default we
    | provide matching values to the padding scale since these utilities
    | generally get used together. You can, of course, modify these
    | values as needed.
    |
    | Class name: .-m{side?}-{size}
    |
    */

  negativeMargin: {
    ...spacing,
    auto: 'auto',
    px: '1px',
    '0': '0',
    '1': '0.3125rem', // 5px
    '2': '0.625rem', // 10px
    '3': '0.9375rem', // 15px
    '4': '1.25rem', // 20px
    '5': '1.5625rem', // 25px
    '6': '1.875rem', // 30px
    '7': '2rem', // 32px
    '8': '2.5rem', // 40px
    '10': '3.125rem', // 50px
    '12': '3.5rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
  },

  /*
    |-----------------------------------------------------------------------------
    | Z-index                                https://tailwindcss.com/docs/z-index
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your z-index utility values. By default we
    | provide a sensible numeric scale. You can, of course, modify these
    | values as needed.
    |
    | Class name: .z-{index}
    |
    */

  zIndex: {
    auto: 'auto',
    '0': 0,
    '1': 1,
    '10': 10,
    '20': 20,
    '30': 30,
    '40': 40,
    '50': 50,
    '60': 60,
  },

  /*
    |-----------------------------------------------------------------------------
    | Opacity                                https://tailwindcss.com/docs/opacity
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your opacity utility values. By default we
    | provide a sensible numeric scale. You can, of course, modify these
    | values as needed.
    |
    | Class name: .opacity-{name}
    |
    */

  opacity: {
    '0': '0',
    '5': '.05',
    '25': '.25',
    '50': '.5',
    '75': '.75',
    '100': '1',
  },

  /*
    |-----------------------------------------------------------------------------
    | SVG fill                                   https://tailwindcss.com/docs/svg
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your SVG fill colors. By default we just provide
    | `fill-current` which sets the fill to the current text color. This lets you
    | specify a fill color using existing text color utilities and helps keep the
    | generated CSS file size down.
    |
    | Class name: .fill-{name}
    |
    */

  svgFill: {
    current: 'currentColor',
  },

  /*
    |-----------------------------------------------------------------------------
    | SVG stroke                                 https://tailwindcss.com/docs/svg
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your SVG stroke colors. By default we just provide
    | `stroke-current` which sets the stroke to the current text color. This lets
    | you specify a stroke color using existing text color utilities and helps
    | keep the generated CSS file size down.
    |
    | Class name: .stroke-{name}
    |
    */

  svgStroke: {
    current: 'currentColor',
  },

  /*
    |-----------------------------------------------------------------------------
    | Modules                  https://tailwindcss.com/docs/configuration#modules
    |-----------------------------------------------------------------------------
    |
    | Here is where you control which modules are generated and what variants are
    | generated for each of those modules.
    |
    | Currently supported variants:
    |   - responsive
    |   - hover
    |   - focus
    |   - active
    |   - group-hover
    |
    | To disable a module completely, use `false` instead of an array.
    |
    */

  modules: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColors: ['hover', 'focus'],
    borderRadius: [],
    borderStyle: [],
    borderWidths: [],
    cursor: [],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: ['responsive'],
    fonts: ['responsive'],
    fontWeights: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive', 'hover'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: ['responsive', 'hover', 'focus'],
    svgFill: [],
    svgStroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover', 'focus'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover', 'focus'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
  },

  /*
    |-----------------------------------------------------------------------------
    | Advanced Options         https://tailwindcss.com/docs/configuration#options
    |-----------------------------------------------------------------------------
    |
    | Here is where you can tweak advanced configuration options. We recommend
    | leaving these options alone unless you absolutely need to change them.
    |
    */

  options: {
    prefix: '',
    important: false,
    separator: ':',
  },

  experiments: {
    shadowLookup: true,
  },
}
