import $ from 'zepto'
import Typing from './typed'
import goOpenSourceUrl from './demo'
import CanvasBk from './canvasBk'

$(() => {
  CanvasBk.init()
  Typing.init()
  goOpenSourceUrl.init()
})
