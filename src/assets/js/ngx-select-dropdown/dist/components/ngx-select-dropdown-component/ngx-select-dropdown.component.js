var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
import { Component, Input, EventEmitter, Output, HostListener, ViewChildren } from "@angular/core";
var SelectDropDownComponent = /** @class */ (function() {
    function SelectDropDownComponent() {
        /**
         * Get the required inputs
         */
        this.options = [];
        /**
         * configuration options
         */
        this.config = {};
        /**
         * Whether multiple selection or single selection allowed
         */
        this.multiple = false;
        /**
         * event when value changes to update in the UI
         */
        this.valueChange = new EventEmitter();
        /**
         * change event when value changes to provide user to handle things in change event
         */
        this.change = new EventEmitter();
        /**
         * Toogle the dropdown list
         */
        this.toggleDropdown = false;
        /**
         * Available items for selection
         */
        this.availableItems = [];
        /**
         * Selected Items
         */
        this.selectedItems = [];
        /**
         * Selection text to be Displayed
         */
        this.selectedDisplayText = "Select";
        /**
         * variable to track if clicked inside or outside of component
         */
        this.clickedInside = false;
        /**
         * variable to track the focused item whenuser uses arrow keys to select item
         */
        this.focusedItemIndex = null;
        this.multiple = false;
    }
    /**
     * click listener for host inside this component i.e
     * if many instances are there, this detects if clicked inside
     * this instance
     */
    SelectDropDownComponent.prototype.clickInsideComponent = function() {
        this.clickedInside = true;
    };
    /**
     * click handler on documnent to hide the open dropdown if clicked outside
     */
    SelectDropDownComponent.prototype.clickOutsideComponent = function() {
        if (!this.clickedInside) {
            this.toggleDropdown = false;
            this.resetArrowKeyActiveElement();
        }
        this.clickedInside = false;
    };
    /**
     * Event handler for key up and down event and enter press for selecting element
     * @param event
     */
    SelectDropDownComponent.prototype.handleKeyboardEvent = function($event) {
        var avaOpts = this.availableOptions.toArray();
        if ($event.code === 'ArrowDown' && avaOpts.length > 0) {
            this.onArrowKeyDown();
            avaOpts[this.focusedItemIndex].nativeElement.focus();
            $event.preventDefault();
        }
        if ($event.code === 'ArrowUp' && avaOpts.length) {
            this.onArrowKeyUp();
            avaOpts[this.focusedItemIndex].nativeElement.focus();
            $event.preventDefault();
        }
        if ($event.code === 'Enter' && this.focusedItemIndex !== null) {
            this.selectItem(this.availableItems[this.focusedItemIndex], this.focusedItemIndex);
            return false;
        }
    };
    /**
     * Component onInit
     */
    SelectDropDownComponent.prototype.ngOnInit = function() {
        if (typeof this.options !== "undefined" && Array.isArray(this.options)) {
            this.availableItems = this.options.sort(this.config.customComparator).slice();
            this.initDropdownValuesAndOptions();
        }
    };
    /**
     * Component onchage i.e when any of the innput properties change
     * @param changes
     */
    SelectDropDownComponent.prototype.ngOnChanges = function(changes) {
        this.selectedItems = [];
        this.searchText = null;
        this.options = this.options || [];
        if (changes.options) {
            this.availableItems = this.options.sort(this.config.customComparator).slice();
        }
        this.initDropdownValuesAndOptions();
    };
    /**
     * Deselct a selected items
     * @param item:  item to be deselected
     * @param index:  index of the item
     */
    SelectDropDownComponent.prototype.deselectItem = function(item, index) {
        this.selectedItems.splice(index, 1);
        if (!this.availableItems.includes(item)) {
            this.availableItems.push(item);
            this.availableItems.sort(this.config.customComparator);
        }
        this.selectedItems = this.selectedItems.slice();
        this.availableItems = this.availableItems.slice();
        this.valueChanged();
        this.resetArrowKeyActiveElement();
    };
    /**
     * Select an item
     * @param item:  item to be selected
     * @param index:  index of the item
     */
    SelectDropDownComponent.prototype.selectItem = function(item, index) {
        if (!this.multiple) {
            if (this.selectedItems.length > 0) {
                this.availableItems.push(this.selectedItems[0]);
            }
            this.selectedItems = [];
            this.toggleDropdown = false;
        }
        this.availableItems.splice(index, 1);
        this.selectedItems.push(item);
        this.selectedItems = this.selectedItems.slice();
        this.availableItems = this.availableItems.slice();
        this.selectedItems.sort(this.config.customComparator);
        this.availableItems.sort(this.config.customComparator);
        this.valueChanged();
        this.resetArrowKeyActiveElement();
    };
    /**
     * When selected items changes trigger the chaange back to parent
     */
    SelectDropDownComponent.prototype.valueChanged = function() {
        this.value = this.selectedItems;
        this.valueChange.emit(this.value);
        this.change.emit({ value: this.value });
        this.setSelectedDisplayText();
    };
    /**
     * Toggle the dropdownlist on/off
     * @param event
     */
    SelectDropDownComponent.prototype.toggleSelectDropdown = function($event) {
        this.toggleDropdown = !this.toggleDropdown;
        this.resetArrowKeyActiveElement();
    };
    /**
     * search for an item in the available items list
     */
    // public search() {
    //   const searchResults: any = [];
    //   if (this.searchText === "") {
    //     this.availableItems = this.options;
    //     // exclude selectedItems from availableItems
    //     this.availableItems = this.availableItems.filter((item: any) => !this.selectedItems.includes(item));
    //     return;
    //   }
    //   for (const item of this.options) {
    //     if (typeof item !== "object") {
    //       if (item.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) {
    //         searchResults.push(item);
    //       }
    //       continue;
    //     }
    //     for (const key in item) {
    //       if (item[key] && item[key].toString().toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) {
    //         if (!searchResults.includes(item)) {
    //           // item is duplicated upon finding the same search text in the same object fields
    //           searchResults.push(item);
    //         }
    //       }
    //     }
    //   }
    //   this.availableItems = searchResults;
    //   // exclude selectedItems from availableItems
    //   this.availableItems = this.availableItems.filter((item: any) => !this.selectedItems.includes(item));
    // }
    /**
     * initialize the config and other properties
     */
    SelectDropDownComponent.prototype.initDropdownValuesAndOptions = function() {
        var _this = this;
        var config = {
            displayKey: "description",
            height: 'auto',
            search: false,
            placeholder: 'Seleccione un elemento',
            limitTo: this.options.length,
            customComparator: undefined
        };
        if (this.config === "undefined" || Object.keys(this.config).length === 0) {
            this.config = __assign({}, config);
        }
        for (var _i = 0, _a = Object.keys(config); _i < _a.length; _i++) {
            var key = _a[_i];
            this.config[key] = this.config[key] ? this.config[key] : config[key];
        }
        // Adding placeholder in config as default param
        this.selectedDisplayText = this.config["placeholder"];
        if (this.value !== "" && typeof this.value !== "undefined" && Array.isArray(this.value)) {
            this.selectedItems = this.value;
            this.value.forEach(function(item) {
                var ind = _this.availableItems.indexOf(item);
                if (ind !== -1) {
                    _this.availableItems.splice(ind, 1);
                }
            });
            this.setSelectedDisplayText();
        }
    };
    /**
     * set the text to be displayed
     */
    SelectDropDownComponent.prototype.setSelectedDisplayText = function() {
        var text = this.selectedItems[0];
        if (typeof this.selectedItems[0] === "object") {
            text = this.selectedItems[0][this.config.displayKey];
        }
        if (this.multiple && this.selectedItems.length > 0) {
            this.selectedDisplayText = this.selectedItems.length === 1 ? text :
                text + (" + " + (this.selectedItems.length - 1) + " mas");
        } else {
            this.selectedDisplayText = this.selectedItems.length === 0 ? this.config.placeholder : text;
        }
    };
    /**
     * Event handler for arrow key up event thats focuses on a item
     */
    SelectDropDownComponent.prototype.onArrowKeyUp = function() {
        if (this.focusedItemIndex === 0) {
            this.focusedItemIndex = this.availableItems.length - 1;
            return;
        }
        if (this.onArrowKey()) {
            this.focusedItemIndex--;
        }
    };
    /**
     * Event handler for arrow key down event thats focuses on a item
     */
    SelectDropDownComponent.prototype.onArrowKeyDown = function() {
        if (this.focusedItemIndex === this.availableItems.length - 1) {
            this.focusedItemIndex = 0;
            return;
        }
        if (this.onArrowKey()) {
            this.focusedItemIndex++;
        }
    };
    SelectDropDownComponent.prototype.onArrowKey = function() {
        if (this.focusedItemIndex === null) {
            this.focusedItemIndex = 0;
            return false;
        }
        return true;
    };
    /**
     * will reset the element that is marked active using arrow keys
     */
    SelectDropDownComponent.prototype.resetArrowKeyActiveElement = function() {
        this.focusedItemIndex = null;
    };
    SelectDropDownComponent.decorators = [{
        type: Component,
        args: [{
            selector: "ngx-select-dropdown",
            template: "\n    <div class=\"ngx-dorpdown-container\">\n        <button type=\"button\" class=\"ngx-dropdown-button\" (click)=\"toggleSelectDropdown($event)\">\n            <span>{{selectedDisplayText}} </span>\n            <span class=\"nsdicon-angle-down\"></span>\n        </button>\n        <div class=\"ngx-dropdown-list-container\" *ngIf=\"toggleDropdown\" [style.maxHeight]=\"config.height\">\n            <div class=\"search-container\" *ngIf=\"config.search\">\n                <input name=\"search\" [(ngModel)]=\"searchText\" />\n                <label [ngClass]=\"{'active': searchText}\">\n                    <span class=\"nsdicon-search\"></span> Buscar</label>\n            </div>\n            <ul class=\"selected-items\">\n                <li tabindex=\"-1\" *ngFor=\"let selected of selectedItems;let i = index\" (click)=\"deselectItem(selected,i)\">\n                    <span> <i class=\"nsdicon-close\"></i> {{selected[config.displayKey] || selected}}</span>\n                </li>\n            </ul>\n            <hr *ngIf=\"selectedItems.length > 0 && availableItems.length > 0\" />\n            <ul class=\"available-items\">\n                <li #availableOption *ngFor=\"let item of availableItems| filterBy: searchText | limitTo : config.limitTo;let i = index\" tabindex=\"-1\"\n                    [ngClass]=\"{'active': focusedItemIndex == i}\" (click)=\"selectItem(item,i)\">\n                    {{item[config.displayKey] || item}}</li>\n            </ul>\n        </div>\n    </div>\n  ",
            styles: ["\n    .ngx-dorpdown-container{width:100%;position:relative}.ngx-dorpdown-container button{display:inline-block;margin-bottom:0;font-weight:400;line-height:1.42857143;vertical-align:middle;touch-action:manipulation;cursor:pointer;user-select:none;border:1px solid #ccc;border-radius:4px;color:#333;background-color:#fff;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis}.ngx-dorpdown-container button span{vertical-align:middle;float:left}.ngx-dorpdown-container button .nsdicon-angle-down{position:relative;font-size:large;float:right}.ngx-dorpdown-container .ngx-dropdown-button{width:100%;min-height:30px;padding:5px 10px 5px 10px;background-color:white}.ngx-dorpdown-container .ngx-dropdown-list-container{box-sizing:border-box;border:1px solid rgba(0,0,0,0.15);border-radius:4px;padding-left:10px;padding-right:10px;z-index:999999999;width:100%;background-clip:padding-box;background:white;position:absolute;-webkit-box-shadow:5px 5px 5px 0px rgba(0,0,0,0.21);-moz-box-shadow:5px 5px 5px 0px rgba(0,0,0,0.21);box-shadow:5px 5px 5px 0px rgba(0,0,0,0.21);overflow-y:auto}.ngx-dorpdown-container .ngx-dropdown-list-container .search-container{position:relative;padding-top:10px;margin-top:5px}.ngx-dorpdown-container .ngx-dropdown-list-container .search-container input{background-color:transparent;border:none;border-bottom:1px solid #9e9e9e;border-radius:0;outline:none;height:2rem;width:100%;font-size:13px;margin:0;padding:0;box-shadow:none;box-sizing:content-box;transition:all 0.3s}.ngx-dorpdown-container .ngx-dropdown-list-container .search-container input:focus{border-bottom:1px solid #26a69a}.ngx-dorpdown-container .ngx-dropdown-list-container .search-container input:focus+label{transform:translateY(-2px) scale(0.8);transform-origin:0 0}.ngx-dorpdown-container .ngx-dropdown-list-container .search-container label{color:#9e9e9e;position:absolute;top:0;left:0;height:100%;font-size:1rem;cursor:text;-webkit-transition:-webkit-transform 0.2s ease-out;transition:-webkit-transform 0.2s ease-out;transition:transform 0.2s ease-out;transition:transform 0.2s ease-out, -webkit-transform 0.2s ease-out;-webkit-transform-origin:0% 100%;transform-origin:0% 100%;text-align:initial;transform:translateY(12px);pointer-events:none}.ngx-dorpdown-container .ngx-dropdown-list-container .search-container label.active{transform:translateY(-2px) scale(0.8);transform-origin:0 0}.ngx-dorpdown-container .ngx-dropdown-list-container ul{margin-top:1rem;margin-bottom:1rem;list-style-type:none;padding-left:0px}.ngx-dorpdown-container .ngx-dropdown-list-container ul.selected-items li{background-color:#7460ee;color:white;margin-bottom:2px}.ngx-dorpdown-container .ngx-dropdown-list-container ul.available-items li.active{background-color:#7460ee;color:#ffff}.ngx-dorpdown-container .ngx-dropdown-list-container ul li{font-size:inherit;cursor:pointer;display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:normal}\n  "],
        }, ]
    }, ];
    /** @nocollapse */
    SelectDropDownComponent.ctorParameters = function() { return []; };
    SelectDropDownComponent.propDecorators = {
        'options': [{ type: Input }, ],
        'config': [{ type: Input }, ],
        'multiple': [{ type: Input }, ],
        'value': [{ type: Input }, ],
        'valueChange': [{ type: Output }, ],
        'change': [{ type: Output }, ],
        'availableOptions': [{ type: ViewChildren, args: ['availableOption', ] }, ],
        'clickInsideComponent': [{ type: HostListener, args: ['click', ] }, ],
        'clickOutsideComponent': [{ type: HostListener, args: ['document:click', ] }, ],
        'handleKeyboardEvent': [{ type: HostListener, args: ['document:keydown', ['$event'], ] }, ],
    };
    return SelectDropDownComponent;
}());
export { SelectDropDownComponent };
//# sourceMappingURL=ngx-select-dropdown.component.js.map