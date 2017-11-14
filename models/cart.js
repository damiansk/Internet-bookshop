function Cart(initItems) {
    this.items = initItems;
    
    this.totalQty = 0;
    this.totalPrice = 0;
    
    if (this.items) {
        for (const key in this.items) {
            this.totalQty += this.items[key].qty;
            this.totalPrice += this.items[key].qty * this.items[key].item.sellingPrice;
        }
    }
    
    this.add = function (item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {qty: 0, item: item, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.sellingPrice * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
    };
    
    this.generateArray = function () {
        const arr = [];
        for (const id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}

module.exports = Cart;