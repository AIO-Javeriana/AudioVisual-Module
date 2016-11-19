/**
 *  Abstract class that represents a Module
 *  @author Fabián Andrés Merchán Jiménez
 */
class Module{

    /**
     *  Gets the id of an specified Module
     */
    constructor(id){
        this.id = id;
    }

    /**
     *  @return Module's id.
     */
    getId(){
        return this.id;
    }

}