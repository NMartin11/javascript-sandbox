// Storage Controller

// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    //Data Structure / State
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookie', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300},
            // {id: 3, name: 'Milk', calories: 10}
        ],
        currentItem: null,
        totalCalories: 0
    };



    return {
        getItems: function() {
            return data.items;
        },
        
        addItem: function(name, calories) {
            let ID;
            //Create ID
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new Item
            newItem = new Item(ID, name, calories);

            // add to items array
            data.items.push(newItem);

            return newItem;
        },

        getItemById: function(id) {
            let found = null;
            //loop through items
            data.items.forEach((item) => {
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },

        setCurrentItem: function(item) {
            data.currentItem = item;
        },

        getCurrentItem: function() {
            return data.currentItem;
        },
        
        getTotalCalories: function(){
            let total = 0;

            // loop through items and add cals
            data.items.forEach((item) => {
                total += item.calories;
            });

            // Set total cal in data structure
            data.totalCalories = total;

            return data.totalCalories;
        }, 

        logData: function() {
            return data;
        }
    }
})();


//UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemsList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        backBtn: '.back-btn',
        editBtn: '.secondary-content',
        clearBtn: '.clear-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn'
    }
    // Public Methods
    return {
        populateItemList: function(items) {
            let html = '';
            items.forEach((item) => {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `;
            });
            
            // Insert list items
            document.querySelector(UISelectors.itemsList).innerHTML = html;
        },
        
        addListItem: function(item) {
            //Show the list
            document.querySelector(UISelectors.itemsList).style.display = 'block';
            // create li element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;

            //Add Html
            li.innerHTML = `
                <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            //Insert item
            document.querySelector(UISelectors.itemsList).insertAdjacentElement('beforeend', li);
        },
        
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            };
        },

        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
    
        hideList: function() {
            document.querySelector(UISelectors.itemsList).style.display = 'none';
        },
        
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }, 
        
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        showEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        getSelectors: function() {
            return UISelectors;
        }
    }
})();


//App Controller
const App = (function(ItemCtrl, UICtrl){

    // Load Event listeners
    const loadEventListeners = function() {
       const UISelectors = UICtrl.getSelectors();
       
       // Add item event
       document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

       // edit icon click event
       document.querySelector(UISelectors.itemsList).addEventListener('click', itemUpdateSubmit);
    };

    // add item submit
    const itemAddSubmit = function(e){
        //Get form input from UI controller
        const input = UICtrl.getItemInput();

        // check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            // add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // add itme to ui list
            UICtrl.addListItem(newItem);

            // Get total Calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            
            // clear field
            UICtrl.clearInput();
        } else {

        }
        e.preventDefault();
    };

    // update item submit
    const itemUpdateSubmit = function(e) {
        if(e.target.classList.contains('edit-item')) {
            // Get list item ID (item-0)
            const listId = e.target.parentNode.parentNode.id;

            // Break into an array
            const listIdArr = listId.split('-');

            // get the actual id
            const id = parseInt(listIdArr[1]);
            
            // get item
            const itemToEdit = ItemCtrl.getItemById(id);
            console.log(itemToEdit);

            // set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    };

    // Public Methods
    return {
        init: function() {
            // clear edit state / set initial set
            UICtrl.clearEditState();
            // fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            // Get total Calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // add total calories to UI
            UICtrl.showTotalCalories(totalCalories);


            // Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

// Initialize App
App.init();