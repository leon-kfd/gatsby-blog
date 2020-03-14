const React = require("react")
exports.wrapRootElement = ({ element }) => {
  return (
    <div id="root">
      {element}
    </div>
  )
}