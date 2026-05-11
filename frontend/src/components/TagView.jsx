import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';

const TagView = ({ tag, onUpdate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const handleAddChild = () => {
    const newTag = { ...tag };
    // If it has data, replace it with children
    if (newTag.data !== undefined) {
      delete newTag.data;
      newTag.children = [];
    }
    
    if (!newTag.children) {
      newTag.children = [];
    }

    newTag.children.push({
      name: 'New Child',
      data: 'Data'
    });

    onUpdate(newTag);
  };

  const handleDataChange = (e) => {
    onUpdate({ ...tag, data: e.target.value });
  };

  const handleNameChange = (e) => {
    if (e.key === 'Enter') {
      onUpdate({ ...tag, name: e.target.value });
      setIsEditingName(false);
    }
  };

  const updateChild = (index, updatedChild) => {
    const newChildren = [...tag.children];
    newChildren[index] = updatedChild;
    onUpdate({ ...tag, children: newChildren });
  };

  return (
    <div className="tag-wrapper">
      <div className="tag-header">
        <button className="tag-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
        
        <div className="tag-name">
          {isEditingName ? (
            <input
              autoFocus
              className="tag-name-input"
              defaultValue={tag.name}
              onKeyDown={handleNameChange}
              onBlur={() => setIsEditingName(false)}
            />
          ) : (
            <span onClick={() => setIsEditingName(true)}>{tag.name}</span>
          )}
        </div>

        <button className="add-child-btn" onClick={handleAddChild}>
          Add Child
        </button>
      </div>

      {!isCollapsed && (
        <div className="tag-content">
          {tag.children ? (
            <div className="tag-container">
              {tag.children.map((child, index) => (
                <TagView
                  key={index}
                  tag={child}
                  onUpdate={(updatedChild) => updateChild(index, updatedChild)}
                />
              ))}
            </div>
          ) : (
            <div className="tag-container">
              <input
                className="data-input"
                value={tag.data || ''}
                onChange={handleDataChange}
                placeholder="Enter data..."
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagView;
