import React, { useRef, useState } from 'react'

const TabsAccessible = () => {
    const tabs = [{ label: 'fruit', content: 'banana' }, { label: 'animal', content: 'pig' }, { label: 'sport', content: 'tennis' }]
    const tabRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const handleKeyDown = (e, index) => {
        if(e.key == 'ArrowRight'){
            e.preventDefault();
            const nextIndex = (index + 1) % tabs.length;
            console.log(nextIndex)
            tabRefs.current[nextIndex].focus();
        }
        else if(e.key == 'ArrowLeft'){
            e.preventDefault();
            const nextIndex = (index - 1 + tabs.length) % tabs.length;
            console.log(nextIndex)
            tabRefs.current[nextIndex].focus();
        } else if (e.key == 'Enter' || e.key == ' '){
            setActiveIndex(index);
        }
    }
    return (
        <div>
            <div>Credits</div>
            <div>
                {tabs.map((tab, index) => {
                const isActive = index == activeIndex;
                return <button key={tab.label}
                    onClick={(()=>setActiveIndex(index))}
                    role="tab"
                    aria-selected={isActive}
                    ref={(e)=> tabRefs.current[index] = e}
                    tabIndex={isActive ? 0 : -1}
                    onKeyDown={(e) => handleKeyDown(e,index)}
                    className={`p-2 px-4 cursor-pointer
                    ${isActive ? 'bg-blue-400' : 'bg-gray-300'}
                    `}>
                    {tab.label}
                </button>})}
            </div>
            <div 
            role="tabpanel"
            className="p-4">
                {tabs[activeIndex].content}
            </div>
        </div>
    )
}

export default TabsAccessible;