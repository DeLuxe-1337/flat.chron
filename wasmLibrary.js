addToLibrary({
  createNode: function (tag, properties) {
    return Module.Runtime.string(
      Module.Flat.createNode(
        Module.Runtime.ChronObjectToObject(tag),
        Module.Runtime.ChronObjectToObject(properties)
      )
    )
  },
  renderNode: function(id) {
    Module.Flat.renderNode(
      Module.Runtime.ChronObjectToObject(id)
    )
  }
})