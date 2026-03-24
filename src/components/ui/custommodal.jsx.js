"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomModal = CustomModal;
var lucide_react_1 = require("lucide-react");
var button_1 = require("./button");
function CustomModal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, title = _a.title, description = _a.description, children = _a.children;
    // Close on Escape key
    useEffect(function () {
        var handleEscape = function (e) {
            if (e.key === 'Escape')
                onClose();
        };
        if (isOpen)
            document.addEventListener('keydown', handleEscape);
        return function () { return document.removeEventListener('keydown', handleEscape); };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}/>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>
            <button_1.Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
              <lucide_react_1.X className="h-4 w-4"/>
            </button_1.Button>
          </div>
          {description && (<p className="text-sm text-gray-500">{description}</p>)}
        </div>
        
        <div className="py-2">
          {children}
        </div>
      </div>
    </div>);
}
