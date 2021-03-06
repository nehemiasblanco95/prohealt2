/**
 * ngx-select-dropdown - A angular(4+) selct dropdown for single selct or multiselct module.
 * @version v0.7.2
 * @author Manish Kumar
 * @link https://github.com/manishjanky/ngx-select-dropdown#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms"], factory);
	else if(typeof exports === 'object')
		exports["ticktock"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"));
	else
		root["ticktock"] = factory(root["ng"]["core"], root["ng"]["common"], root["ng"]["forms"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var SelectDropDownComponent = /** @class */ (function () {
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
        this.valueChange = new core_1.EventEmitter();
        /**
         * change event when value changes to provide user to handle things in change event
         */
        this.change = new core_1.EventEmitter();
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
    SelectDropDownComponent.prototype.clickInsideComponent = function () {
        this.clickedInside = true;
    };
    /**
     * click handler on documnent to hide the open dropdown if clicked outside
     */
    SelectDropDownComponent.prototype.clickOutsideComponent = function () {
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
    SelectDropDownComponent.prototype.handleKeyboardEvent = function ($event) {
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
    SelectDropDownComponent.prototype.ngOnInit = function () {
        if (typeof this.options !== "undefined" && Array.isArray(this.options)) {
            this.availableItems = this.options.sort(this.config.customComparator).slice();
            this.initDropdownValuesAndOptions();
        }
    };
    /**
     * Component onchage i.e when any of the innput properties change
     * @param changes
     */
    SelectDropDownComponent.prototype.ngOnChanges = function (changes) {
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
    SelectDropDownComponent.prototype.deselectItem = function (item, index) {
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
    SelectDropDownComponent.prototype.selectItem = function (item, index) {
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
    SelectDropDownComponent.prototype.valueChanged = function () {
        this.value = this.selectedItems;
        this.valueChange.emit(this.value);
        this.change.emit({ value: this.value });
        this.setSelectedDisplayText();
    };
    /**
     * Toggle the dropdownlist on/off
     * @param event
     */
    SelectDropDownComponent.prototype.toggleSelectDropdown = function ($event) {
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
    SelectDropDownComponent.prototype.initDropdownValuesAndOptions = function () {
        var _this = this;
        var config = {
            displayKey: "description",
            height: 'auto',
            search: false,
            placeholder: 'Select',
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
            this.value.forEach(function (item) {
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
    SelectDropDownComponent.prototype.setSelectedDisplayText = function () {
        var text = this.selectedItems[0];
        if (typeof this.selectedItems[0] === "object") {
            text = this.selectedItems[0][this.config.displayKey];
        }
        if (this.multiple && this.selectedItems.length > 0) {
            this.selectedDisplayText = this.selectedItems.length === 1 ? text :
                text + (" + " + (this.selectedItems.length - 1) + " more");
        }
        else {
            this.selectedDisplayText = this.selectedItems.length === 0 ? this.config.placeholder : text;
        }
    };
    /**
     * Event handler for arrow key up event thats focuses on a item
     */
    SelectDropDownComponent.prototype.onArrowKeyUp = function () {
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
    SelectDropDownComponent.prototype.onArrowKeyDown = function () {
        if (this.focusedItemIndex === this.availableItems.length - 1) {
            this.focusedItemIndex = 0;
            return;
        }
        if (this.onArrowKey()) {
            this.focusedItemIndex++;
        }
    };
    SelectDropDownComponent.prototype.onArrowKey = function () {
        if (this.focusedItemIndex === null) {
            this.focusedItemIndex = 0;
            return false;
        }
        return true;
    };
    /**
     * will reset the element that is marked active using arrow keys
     */
    SelectDropDownComponent.prototype.resetArrowKeyActiveElement = function () {
        this.focusedItemIndex = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SelectDropDownComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SelectDropDownComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SelectDropDownComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SelectDropDownComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectDropDownComponent.prototype, "valueChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SelectDropDownComponent.prototype, "change", void 0);
    __decorate([
        core_1.ViewChildren('availableOption'),
        __metadata("design:type", core_1.QueryList)
    ], SelectDropDownComponent.prototype, "availableOptions", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SelectDropDownComponent.prototype, "clickInsideComponent", null);
    __decorate([
        core_1.HostListener('document:click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SelectDropDownComponent.prototype, "clickOutsideComponent", null);
    __decorate([
        core_1.HostListener('document:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], SelectDropDownComponent.prototype, "handleKeyboardEvent", null);
    SelectDropDownComponent = __decorate([
        core_1.Component({
            selector: "ngx-select-dropdown",
            template: __webpack_require__(5),
            styles: [__webpack_require__(6)],
        }),
        __metadata("design:paramtypes", [])
    ], SelectDropDownComponent);
    return SelectDropDownComponent;
}());
exports.SelectDropDownComponent = SelectDropDownComponent;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var components_1 = __webpack_require__(3);
exports.SelectDropDownComponent = components_1.SelectDropDownComponent;
var ngx_select_dropdown_module_1 = __webpack_require__(9);
exports.SelectDropDownModule = ngx_select_dropdown_module_1.SelectDropDownModule;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ngx-dorpdown-container\">\r\n    <button type=\"button\" class=\"ngx-dropdown-button\" (click)=\"toggleSelectDropdown($event)\">\r\n        <span>{{selectedDisplayText}} </span>\r\n        <span class=\"nsdicon-angle-down\"></span>\r\n    </button>\r\n    <div class=\"ngx-dropdown-list-container\" *ngIf=\"toggleDropdown\" [style.maxHeight]=\"config.height\">\r\n        <div class=\"search-container\" *ngIf=\"config.search\">\r\n            <input name=\"search\" [(ngModel)]=\"searchText\" />\r\n            <label [ngClass]=\"{'active': searchText}\">\r\n                <span class=\"nsdicon-search\"></span> Search</label>\r\n        </div>\r\n        <ul class=\"selected-items\">\r\n            <li tabindex=\"-1\" *ngFor=\"let selected of selectedItems;let i = index\" (click)=\"deselectItem(selected,i)\">\r\n                <span class=\"nsdicon-close\"> {{selected[config.displayKey] || selected}}</span>\r\n            </li>\r\n        </ul>\r\n        <hr *ngIf=\"selectedItems.length > 0 && availableItems.length > 0\" />\r\n        <ul class=\"available-items\">\r\n            <li #availableOption *ngFor=\"let item of availableItems| filterBy: searchText | limitTo : config.limitTo;let i = index\" tabindex=\"-1\"\r\n                [ngClass]=\"{'active': focusedItemIndex == i}\" (click)=\"selectItem(item,i)\">\r\n                {{item[config.displayKey] || item}}</li>\r\n        </ul>\r\n    </div>\r\n</div>"

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(7);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".ngx-dorpdown-container {\n  width: 100%;\n  position: relative; }\n  .ngx-dorpdown-container button {\n    display: inline-block;\n    margin-bottom: 0;\n    font-weight: 400;\n    line-height: 1.42857143;\n    vertical-align: middle;\n    touch-action: manipulation;\n    cursor: pointer;\n    user-select: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    color: #333;\n    background-color: #fff;\n    white-space: nowrap;\n    overflow-x: hidden;\n    text-overflow: ellipsis; }\n    .ngx-dorpdown-container button span {\n      vertical-align: middle;\n      float: left; }\n    .ngx-dorpdown-container button .nsdicon-angle-down {\n      position: relative;\n      font-size: large;\n      float: right; }\n  .ngx-dorpdown-container .ngx-dropdown-button {\n    width: 100%;\n    min-height: 30px;\n    padding: 5px 10px 5px 10px;\n    background-color: white; }\n  .ngx-dorpdown-container .ngx-dropdown-list-container {\n    box-sizing: border-box;\n    border: 1px solid rgba(0, 0, 0, 0.15);\n    border-radius: 4px;\n    padding-left: 10px;\n    padding-right: 10px;\n    z-index: 999999999;\n    width: 100%;\n    background-clip: padding-box;\n    background: white;\n    position: absolute;\n    -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.21);\n    -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.21);\n    box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.21);\n    overflow-y: auto; }\n    .ngx-dorpdown-container .ngx-dropdown-list-container .search-container {\n      position: relative;\n      padding-top: 10px;\n      margin-top: 5px; }\n      .ngx-dorpdown-container .ngx-dropdown-list-container .search-container input {\n        background-color: transparent;\n        border: none;\n        border-bottom: 1px solid #9e9e9e;\n        border-radius: 0;\n        outline: none;\n        height: 2rem;\n        width: 100%;\n        font-size: 13px;\n        margin: 0;\n        padding: 0;\n        box-shadow: none;\n        box-sizing: content-box;\n        transition: all 0.3s; }\n        .ngx-dorpdown-container .ngx-dropdown-list-container .search-container input:focus {\n          border-bottom: 1px solid #26a69a; }\n        .ngx-dorpdown-container .ngx-dropdown-list-container .search-container input:focus + label {\n          transform: translateY(-2px) scale(0.8);\n          transform-origin: 0 0; }\n      .ngx-dorpdown-container .ngx-dropdown-list-container .search-container label {\n        color: #9e9e9e;\n        position: absolute;\n        top: 0;\n        left: 0;\n        height: 100%;\n        font-size: 1rem;\n        cursor: text;\n        -webkit-transition: -webkit-transform 0.2s ease-out;\n        transition: -webkit-transform 0.2s ease-out;\n        transition: transform 0.2s ease-out;\n        transition: transform 0.2s ease-out, -webkit-transform 0.2s ease-out;\n        -webkit-transform-origin: 0% 100%;\n        transform-origin: 0% 100%;\n        text-align: initial;\n        transform: translateY(12px);\n        pointer-events: none; }\n        .ngx-dorpdown-container .ngx-dropdown-list-container .search-container label.active {\n          transform: translateY(-2px) scale(0.8);\n          transform-origin: 0 0; }\n    .ngx-dorpdown-container .ngx-dropdown-list-container ul {\n      margin-top: 1rem;\n      margin-bottom: 1rem;\n      list-style-type: none;\n      padding-left: 0px; }\n      .ngx-dorpdown-container .ngx-dropdown-list-container ul.selected-items li {\n        background-color: #337ab7;\n        color: white;\n        margin-bottom: 2px; }\n      .ngx-dorpdown-container .ngx-dropdown-list-container ul.available-items li.active {\n        background-color: #337ab7;\n        color: #ffff; }\n      .ngx-dorpdown-container .ngx-dropdown-list-container ul li {\n        font-size: inherit;\n        cursor: pointer;\n        display: block;\n        padding: 3px 20px;\n        clear: both;\n        font-weight: 400;\n        line-height: 1.42857143;\n        color: #333;\n        white-space: normal; }\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var filter_by_pipe_1 = __webpack_require__(10);
var limit_to_pipe_1 = __webpack_require__(11);
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(12);
var forms_1 = __webpack_require__(13);
var ngx_select_dropdown_component_1 = __webpack_require__(1);
var SelectDropDownModule = /** @class */ (function () {
    function SelectDropDownModule() {
    }
    SelectDropDownModule = __decorate([
        core_1.NgModule({
            declarations: [ngx_select_dropdown_component_1.SelectDropDownComponent, limit_to_pipe_1.LimitToPipe, filter_by_pipe_1.ArrayFilterPipe],
            imports: [common_1.CommonModule, forms_1.FormsModule],
            exports: [ngx_select_dropdown_component_1.SelectDropDownComponent, limit_to_pipe_1.LimitToPipe],
            providers: [],
            bootstrap: []
        })
    ], SelectDropDownModule);
    return SelectDropDownModule;
}());
exports.SelectDropDownModule = SelectDropDownModule;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
/**
 * filters an array based on searctext
 */
var ArrayFilterPipe = /** @class */ (function () {
    function ArrayFilterPipe() {
    }
    ArrayFilterPipe.prototype.transform = function (array, searchText, keyName) {
        if (!array || !searchText || !Array.isArray(array)) {
            return array;
        }
        if (typeof array[0] === 'string') {
            return array.filter(function (item) { return item.toLowerCase().indexOf(searchText.toLowerCase()) > -1; });
        }
        // filter array, items which match and return true will be
        // kept, false will be filtered out
        if (!keyName) {
            return array.filter(function (item) {
                for (var key in item) {
                    if (typeof item[key] !== "object" && item[key].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                        return true;
                    }
                }
                return false;
            });
        }
        else {
            return array.filter(function (item) {
                if (typeof item[keyName] !== "object" && item[keyName].toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            });
        }
    };
    ArrayFilterPipe = __decorate([
        core_1.Pipe({
            name: "filterBy"
        })
    ], ArrayFilterPipe);
    return ArrayFilterPipe;
}());
exports.ArrayFilterPipe = ArrayFilterPipe;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var LimitToPipe = /** @class */ (function () {
    function LimitToPipe() {
    }
    LimitToPipe.prototype.transform = function (array, itemsCount, startIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (!Array.isArray(array)) {
            return array;
        }
        return array.slice(startIndex, startIndex + itemsCount);
    };
    LimitToPipe = __decorate([
        core_1.Pipe({
            name: "limitTo"
        })
    ], LimitToPipe);
    return LimitToPipe;
}());
exports.LimitToPipe = LimitToPipe;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map