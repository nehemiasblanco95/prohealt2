import { OnInit, EventEmitter, OnChanges, SimpleChanges, ElementRef, QueryList } from "@angular/core";
export declare class SelectDropDownComponent implements OnInit, OnChanges {
    /**
     * Get the required inputs
     */
    options: any;
    /**
     * configuration options
     */
    config: any;
    /**
     * Whether multiple selection or single selection allowed
     */
    multiple: boolean;
    /**
     * Value
     */
    value: any;
    /**
     * event when value changes to update in the UI
     */
    valueChange: EventEmitter<any>;
    /**
     * change event when value changes to provide user to handle things in change event
     */
    change: EventEmitter<any>;
    /**
     * Toogle the dropdown list
     */
    toggleDropdown: boolean;
    /**
     * Available items for selection
     */
    availableItems: any;
    /**
     * Selected Items
     */
    selectedItems: any;
    /**
     * Selection text to be Displayed
     */
    selectedDisplayText: string;
    /**
     * Search text
     */
    searchText: string;
    /**
     * variable to track if clicked inside or outside of component
     */
    clickedInside: boolean;
    /**
     * variable to track the focused item whenuser uses arrow keys to select item
     */
    focusedItemIndex: number;
    /**
     * Hold the reference to available items in the list to focus on the item when scrolling
     */
    availableOptions: QueryList<ElementRef>;
    constructor();
    /**
     * click listener for host inside this component i.e
     * if many instances are there, this detects if clicked inside
     * this instance
     */
    clickInsideComponent(): void;
    /**
     * click handler on documnent to hide the open dropdown if clicked outside
     */
    clickOutsideComponent(): void;
    /**
     * Event handler for key up and down event and enter press for selecting element
     * @param event
     */
    handleKeyboardEvent($event: KeyboardEvent): boolean;
    /**
     * Component onInit
     */
    ngOnInit(): void;
    /**
     * Component onchage i.e when any of the innput properties change
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Deselct a selected items
     * @param item:  item to be deselected
     * @param index:  index of the item
     */
    deselectItem(item: any, index: number): void;
    /**
     * Select an item
     * @param item:  item to be selected
     * @param index:  index of the item
     */
    selectItem(item: string, index: number): void;
    /**
     * When selected items changes trigger the chaange back to parent
     */
    valueChanged(): void;
    /**
     * Toggle the dropdownlist on/off
     * @param event
     */
    toggleSelectDropdown($event: any): void;
    /**
     * search for an item in the available items list
     */
    /**
     * initialize the config and other properties
     */
    private initDropdownValuesAndOptions();
    /**
     * set the text to be displayed
     */
    private setSelectedDisplayText();
    /**
     * Event handler for arrow key up event thats focuses on a item
     */
    private onArrowKeyUp();
    /**
     * Event handler for arrow key down event thats focuses on a item
     */
    private onArrowKeyDown();
    private onArrowKey();
    /**
     * will reset the element that is marked active using arrow keys
     */
    private resetArrowKeyActiveElement();
}
