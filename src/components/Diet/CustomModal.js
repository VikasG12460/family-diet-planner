"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomModal = CustomModal;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../ui/button");
function CustomModal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, title = _a.title, description = _a.description, children = _a.children;
    // Handle Escape key press to close modal
    (0, react_1.useEffect)(function () {
        var handleEscape = function (e) {
            if (e.key === 'Escape')
                onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }
        return function () {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden="true"/>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
          <button_1.Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <lucide_react_1.X className="h-4 w-4"/>
          </button_1.Button>
        </div>
        
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>);
}
