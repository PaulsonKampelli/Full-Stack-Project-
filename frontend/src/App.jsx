import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TagView from './components/TagView';
import { Download, Save, Plus } from 'lucide-react';

const API_BASE = '/_/backend/api';

const DEFAULT_TREE = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: "c1-c1 Hello" },
        { name: 'child1-child2', data: "c1-c2 JS" }
      ]
    },
    { name: 'child2', data: "c2 World" }
  ]
};

function App() {
  const [trees, setTrees] = useState([]);
  const [exportedJson, setExportedJson] = useState({});

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    try {
      const response = await axios.get(`${API_BASE}/trees`);
      if (response.data.length === 0) {
        setTrees([{ id: null, name: 'Root Tree', structure: DEFAULT_TREE }]);
      } else {
        setTrees(response.data);
      }
    } catch (error) {
      console.error("Error fetching trees:", error);
      // Fallback if backend is not running
      setTrees([{ id: null, name: 'Root Tree', structure: DEFAULT_TREE }]);
    }
  };

  const handleUpdateTree = (index, newStructure) => {
    const newTrees = [...trees];
    newTrees[index] = { ...newTrees[index], structure: newStructure };
    setTrees(newTrees);
  };

  const handleExport = async (index) => {
    const tree = trees[index];
    // Strip internal state if any (though here we only have name, children, data)
    const cleanStructure = JSON.parse(JSON.stringify(tree.structure));
    
    setExportedJson(prev => ({ ...prev, [index]: JSON.stringify(cleanStructure, null, 2) }));
    
    try {
      if (tree.id) {
        await axios.put(`${API_BASE}/trees/${tree.id}`, {
          name: tree.name,
          structure: cleanStructure
        });
        alert('Tree updated successfully!');
      } else {
        const response = await axios.post(`${API_BASE}/trees`, {
          name: tree.name,
          structure: cleanStructure
        });
        const newTrees = [...trees];
        newTrees[index] = response.data;
        setTrees(newTrees);
        alert('Tree saved to database!');
      }
    } catch (error) {
      console.error("Error saving tree:", error);
      alert('Failed to save tree to database. Check if backend is running.');
    }
  };

  const addNewTree = () => {
    setTrees([...trees, { id: null, name: 'New Tree', structure: DEFAULT_TREE }]);
  };

  return (
    <div className="container">
      <h1>AIMonk Tags Tree</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button className="export-btn" style={{ margin: '0 auto' }} onClick={addNewTree}>
          <Plus size={20} /> Create New Tree
        </button>
      </div>

      {trees.map((tree, index) => (
        <div key={tree.id || `temp-${index}`} className="tree-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h2 style={{ fontSize: '1.5rem', color: '#60a5fa' }}>{tree.name}</h2>
             <button className="export-btn" onClick={() => handleExport(index)}>
                <Download size={18} /> Export & Save
             </button>
          </div>
          
          <TagView 
            tag={tree.structure} 
            onUpdate={(newStructure) => handleUpdateTree(index, newStructure)} 
          />

          {exportedJson[index] && (
            <div className="json-output-wrapper">
              <h3 style={{ marginTop: '1.5rem', fontSize: '1rem', color: '#10b981' }}>Exported JSON:</h3>
              <div className="json-output">
                {exportedJson[index]}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
