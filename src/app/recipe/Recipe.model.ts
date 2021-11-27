import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
    public id:number;
    public name: string;
    public discription: string;
    public imagePath: string;
    public ingredient: Ingredient[];

    constructor(id :number,name: string, desc: string,imagePath: string, ingredients:Ingredient[]){
        this.id=id;
        this.name=name;
        this.discription=desc;
        this.imagePath=imagePath; 
        this.ingredient=ingredients;
    }
}