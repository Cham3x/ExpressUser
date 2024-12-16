class Annonce { 
    constructor(userName,{ title, price, category, description }) {
        this.userName = userName;
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description;
      }
}
  
module.exports=Annonce