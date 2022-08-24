import React from 'react';
import { GraphView } from 'react-digraph';
import NodeData from './Sidebar';
import { SidebarPortal } from '@plone/volto/components';

const BUTTON_TYPE = 'button';
const CHAT_TYPE = 'chat';
const TEXT_TYPE = 'text';

const TYPES = {
  [BUTTON_TYPE]: BUTTON_TYPE,
  [TEXT_TYPE]: TEXT_TYPE,
  [CHAT_TYPE]: CHAT_TYPE,
};

const EMPTY_EDGE_TYPE = 'emptyEdge';

const GraphConfig = {
  NodeTypes: {
    text: {
      // required to show empty nodes
      typeText: 'Text',
      shapeId: '#text', // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="text" key="0">
          <circle cx="50" cy="50" r="45" />
        </symbol>
      ),
    },
    button: {
      // required to show empty nodes
      typeText: 'Button',
      shapeId: '#button', // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="button" key="0">
          <circle cx="50" cy="50" r="45" />
        </symbol>
      ),
    },
    chat: {
      // required to show empty nodes
      typeText: 'Chat',
      shapeId: '#chat', // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="chat" key="0">
          <circle cx="50" cy="50" r="45" />
        </symbol>
      ),
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {
      // required to show empty edges
      shapeId: '#emptyEdge',
      // edge type could be "wait" or "delay" and
      // the target node's wait time could be displayed in the edge (in the arrow)
      shape: <span id="emptyEdge" />,
      /*shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
          <circle cx="25" cy="25" r="8" fill="currentColor">
            {" "}
          </circle>
        </symbol>
      )*/
    },
  },
};

const NODE_KEY = 'id'; // Allows D3 to correctly update DOM

export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: {
        nodes: [
          {
            id: '1',
            title: '???',
            type: 'text',
            x: -200,
            y: 200,
          },
          {
            id: '2',
            title: 'Advice',
            type: 'button',
            x: 0,
            y: 300,
          },
          {
            id: '3',
            title: 'Help',
            type: 'button',
            x: 0,
            y: 100,
          },
          {
            id: '4',
            title: 'To chat!',
            type: 'chat',
            x: 200,
            y: 200,
          },
        ],
        edges: [
          { source: '1', target: '2', type: 'empty', title: 'Private' },
          { source: '2', target: '4', type: 'empty', title: 'Pending' },
          { source: '1', target: '3', type: 'empty', title: 'Preview' },
          { source: '3', target: '4', type: 'empty', title: 'Retract' },
        ],
      },
      selected: null,
      selectionType: null,
    };
  }

  onCreateNode = (x, y, a) => {
    const node = {
      id: UUID(),
      title: 'Title',
      x,
      y,
      type: TEXT_TYPE,
    };
    // console.log('create', node);
    this.setState((state) => {
      state.graph.nodes = state.graph.nodes.concat(node);
      return state;
    });
  };

  onSelectNode = (node) => {
    const selected = this.state.selected;
    // console.log('select node', node);
    // console.log(this.state);
    if (node && (!selected || selected[NODE_KEY] !== node[NODE_KEY])) {
      this.setState({
        selected: node,
        selectionType: 'Node',
      });
    } else if (!node && selected) {
      this.setState({
        selected: null,
      });
    }
  };

  onUpdateNode = (viewNode) => {
    // console.log('update node', viewNode);
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({ graph });
  };

  onDeleteNode = (node, nodeId, nodeArr) => {
    // console.log('delete node', node);
    const graph = this.state.graph;
    // Delete any connected edges
    const newEdges = graph.edges.filter((edge, i) => {
      return edge.source !== node[NODE_KEY] && edge.target !== node[NODE_KEY];
    });

    graph.nodes = nodeArr;
    graph.edges = newEdges;

    this.setState({ graph, selected: null });
  };

  onSelectEdge = (edge) => {
    // console.log('select edge', edge);
    this.setState({
      selected: edge,
      selectionType: 'Edge',
    });
  };

  onCreateEdge = (sourceViewNode, targetViewNode) => {
    const graph = this.state.graph;
    const type = EMPTY_EDGE_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type,
    };

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      graph.edges = [...graph.edges, viewEdge];
      this.setState({
        graph,
        selected: viewEdge,
      });
    }
  };

  // onSwapEdge = () => {
  //   console.log('swap edge');
  // };

  // onDeleteEdge = () => {
  //   console.log('delete edge');
  // };

  getNodeIndex(searchNode) {
    return this.state.graph.nodes.findIndex((node) => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  }

  // Helper to find the index of a given edge
  getEdgeIndex(searchEdge) {
    return this.state.graph.edges.findIndex((edge) => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  }

  updateSelectedNodeTitle = (e) => {
    const graph = this.state.graph;
    const selected = this.state.selected;

    const title = e.target.value;
    selected.title = title;

    const i = this.getNodeIndex(selected);
    graph.nodes[i].title = title;

    this.setState({
      graph,
      selected,
    });
  };

  onChangeNode = (id, value) => {
    // console.log('this is from onChagneNOde', id, value);
    const graph = this.state.graph;
    const selected = this.state.selected;
    const title = value;
    selected.title = title;

    const i = this.getNodeIndex(selected);
    const node = graph.nodes[i];
    node[id] = title;

    graph.nodes[i] = node;

    this.setState({
      graph,
      selected,
    });
  };

  onChangeEdge = (id, value) => {
    const graph = this.state.graph;
    const selected = this.state.selected;
    const title = value;
    selected.title = title;

    const i = this.getEdgeIndex(selected);
    const edge = graph.edges[i];
    edge[id] = value;

    graph.edges[i] = edge;

    this.setState({
      graph,
      selected,
    });
  };

  updateSelectedNodeType = (e) => {
    const graph = this.state.graph;
    const selected = this.state.selected;

    const type = e.target.value;

    if (type in TYPES) {
      selected.type = type;

      const i = this.getNodeIndex(selected);
      graph.nodes[i].type = type;

      this.setState({
        graph,
        selected,
      });
    }
  };

  render() {
    const nodes = this.state.graph.nodes;
    const edges = this.state.graph.edges;
    const selected = this.state.selected;

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;

    return (
      <div>
        <div>
          <p>Shift+click creates a new node</p>
          <p>Shift+click a node and drag to another node creates an edge</p>
          <p>Click a node and pressing delete deletes the node and its edges</p>
          <p>
            Node text and type can be changed after selecting a node by clicking
            it
          </p>
        </div>
        <div id="graph">
          <GraphView
            ref="GraphView"
            nodeKey={NODE_KEY}
            nodes={nodes}
            edges={edges}
            selected={selected}
            nodeTypes={NodeTypes}
            nodeSubtypes={NodeSubtypes}
            edgeTypes={EdgeTypes}
            onCreateNode={this.onCreateNode}
            onSelectNode={this.onSelectNode}
            onUpdateNode={this.onUpdateNode}
            onDeleteNode={this.onDeleteNode}
            onSelectEdge={this.onSelectEdge}
            onCreateEdge={this.onCreateEdge}
            onSwapEdge={this.onSwapEdge}
            onDeleteEdge={this.onDeleteEdge}
          />
        </div>
        {selected && (
          <div>
            <SidebarPortal selected={selected}>
              <NodeData
                data={selected}
                onChangeBlock={
                  this.state.selectionType === 'Node'
                    ? this.onChangeNode
                    : this.onChangeEdge
                }
                selectionType={this.state.selectionType}
              />
            </SidebarPortal>
          </div>
        )}
      </div>
    );
  }
}

function UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
    c,
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
