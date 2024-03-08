let nextNodeId = 0;
let nodes = {}

// Define a virtual DOM node
class FlatElement {
    constructor(tag, props) {
        this.id = nextNodeId++; // Assign a unique ID
        this.tag = tag;
        this.props = props;
        this.element = document.createElement(this.tag);
    }
    setProperties(props) {
        for (const [key, value] of Object.entries(props)) {
            switch (key) {
                case "content": {
                    this.element.textContent = value
                    break;
                }
                default: {
                    this.element.setAttribute(key, value);
                    break;
                }
            }
        }
    }
    render() {
        this.setProperties(this.props)
        document.body.appendChild(this.element)
    }
    get_id() {
        return `node_${this.id}`;
    }
}

// Example usage
function createNode(tag, props) {
    const node = new FlatElement(tag, props);
    nodes[node.get_id()] = node
    return node.get_id();
}

function getNodeById(id) {
    return nodes[id]
}

function renderNode(id) {
    getNodeById(id).render()
}

Module.Flat = {
    createNode: createNode,
    renderNode: renderNode
}