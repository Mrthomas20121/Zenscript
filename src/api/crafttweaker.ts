export interface Crafttweaker {}

declare namespace Crafttweaker {
  interface api{
    IItemStack:{

    },
    IIngredient: {

    }
  }
}

declare function or(item:IIngredient):IIngredient

interface IItemStack {}
interface IOredict {}
interface IIngredient extends IOredict,IItemStack {}

type recipeFunc = (ins:any, out:any,event:any) => {}

/**
 * Recipe Interface
 */
export interface recipes {
  /**
   * Remove a recipe
   * @param Item IIngredient
   */
  remove(Item:IIngredient):void
  /**
   * Remove a recipe by name
   * @param recipeName String
   */
  removeByRecipeName(recipeName:String):void,
  /**
   * add a shaped recipe
   * @param recipeName String
   * @param recipe IIngredient[][]
   * @param recipeFunc (ins:any, out:any,event:any) => {}
   */
  addShaped(recipeName:String, recipe:IIngredient[][],recipeFunc:recipeFunc):void,
  /**
   * add a shapeless recipe
   * @param recipeName String
   * @param recipe IIngredient[][]
   * @param recipeFunc (ins:any, out:any,event:any) => {}
   */
  addShapeless(recipeName:String, recipe:IIngredient[], recipeFunc:recipeFunc):void,
  /**
   * add a shapeless recipe
   * @param recipe IIngredient[][]
   * @param recipeFunc (ins:any, out:any,event:any) => {}
   */
  addShapeless(recipe:IIngredient[], recipeFunc:recipeFunc):void
  addHiddenShapeless(recipeName:String, recipe:IIngredient[], recipeFunc:recipeFunc):void
  addHiddenShaped(recipeName:String, recipe:IIngredient[][],recipeFunc:recipeFunc):void
}

/**
 * Furnace Interface
 */
export interface furnace {
  /**
   * remove a furnace recipe by Output
   * @param output IIngredient
   */
  remove(output:IIngredient):void
  /**
   * remove a furnace recipe by output and input
   * @param output IItemStack
   * @param input IItemStack
   */
  remove(output:IItemStack, input:IItemStack):void

  /**
   * add a furnace recipe
   * @param input IIngredient output
   * @param output IItemStack input
   * @param xp Number nb of xp the recipe give
   */
  addRecipe(input:IIngredient, output:IItemStack, xp:Number):void
}

export interface mods {
  jei:jei
}
/**
 * Jei interface
 */
interface jei {
  JEI:{
    /**
     * remove a item recipe and hide that item.
     * @param Item IItemStack
     */
    removeAndHide(Item:IItemStack):void
    /**
     * Hide a Item
     * @param Item IItemStack
     */
    hide(Item:IItemStack):void
  }
}