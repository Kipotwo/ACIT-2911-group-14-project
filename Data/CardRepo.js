const Cards = require('../Models/Card');

class CardRepo {
    
    // This is the constructor.
    CardRepo() {        
    }

    // Gets all flashcards.
    async getallcards() {     
        let cards = await Cards.find().exec();
        return   cards;
    }

    async getCard(title) {  
        let card = await Cards.findOne({title:title}).exec();
        return   card;
    }

    async getCardbyID(id) {  
        let card = await Cards.findOne({_id:id}).exec();
        return   card;
    }

    async userFlashCards(title) {  
        let flashcards = await Cards.find({title: title}).exec();
        return   flashcards;
    }

    async create(cardObj) {
        try {
            // Checks if model conforms to validation rules that we set in Mongoose.
            var error = await cardObj.validateSync();
    
            // The model is invalid. Return the object and error message. 
            if(error) {
                let response = {
                    obj:          cardObj,
                    errorMessage: error.message };
    
                return response; // Exit if the model is invalid.
            } 
    
            // Model is not invalid so save it.
            const result = await cardObj.save();
    
            // Success! Return the model and no error message needed.
            let response = {
                obj:          result,
                errorMessage: "" };
    
            return response;
        } 
        //  Error occurred during the save(). Return orginal model and error message.
        catch (err) {
            let response = {
                obj:          cardObj,
                errorMessage: err.message };
    
            return  response;
        }    
    }

    //Edit
    async update(editedObj) {   
    
        // Set up response object which contains origianl card object and empty error message.
        let response = {
            obj:          editedObj,
            errorMessage: "" };
    
        try {
            // Ensure the content submitted by the user validates.
            var error = await editedObj.validateSync();
            if(error) {
                response.errorMessage = error.message;
                return response;
            } 
    
            // Load the actual corresponding object in the database.
            let cardObject = await this.getCardbyID(editedObj.id);
    
            // Check if card exists.
            if(cardObject) {
    
                // Card exists so update it.
                let updated = await Cards.updateOne(
                    { _id: editedObj.id}, // Match id.
    
                    // Set new attribute values here.
                    {$set: { context: editedObj.context }}); 
    
                // No errors during update.
                if(updated.nModified!=0) {
                    response.obj = editedObj;
                    return response;
                }
                // Errors occurred during the update.
                else {
                    response.errorMessage = 
                        "An error occurred during the update. The item did not save." 
                };
                return response; 
            }
                
            // Card not found.
            else {
                response.errorMessage = "An item with this id cannot be found." };
                return response; 
            }
    
                    // An error occurred during the update. 
        catch (err) {
            response.errorMessage = err.message;
            return  response;
        }    
    }
    
}

module.exports = CardRepo;