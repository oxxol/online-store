import {ItemInCart, ParamOfCart, Promo} from "../../types/types";
import {renderAppliedCodes} from "./renderAppliedCodes";
import {createEl} from "../../components/createEl";

export class CartServices{
    static getState = () => {
        let state: ItemInCart[];
        const cartStateJewelryStore = localStorage.getItem('cartStateJewelryStore');

        if (cartStateJewelryStore) {
            state = JSON.parse(cartStateJewelryStore);
        } else {
            state = [];
        }

        return state;
    }

    static getDiscount = (currentTotalWrapper:HTMLElement,item?: Promo) => {
        const promoTable = renderAppliedCodes(item);
        const discountBlock = createEl('div','cart__summary__discount-block');
        const newTotalElement = createEl('div','cart__summary-total-update');
        const currentTotal = Number(currentTotalWrapper.innerText.split('$').reverse()[0]);
        const appliedDiscount = JSON.parse(`${localStorage.getItem('appliedCodesJewelryStore')}`);
        const summaryDiscount = appliedDiscount?appliedDiscount.reduce((acc:number,el:Promo)=>{
            acc += el.discount ?el.discount: 0;
            return  acc;
        },0):0;
        const newTotal = currentTotal-currentTotal*(summaryDiscount/100);

        if (appliedDiscount) {
            discountBlock.appendChild(newTotalElement);
            discountBlock.appendChild(promoTable);
            currentTotalWrapper.classList.add('cancelled');
            newTotalElement.textContent = `Total: $${newTotal} `;

            if (currentTotalWrapper.parentElement) {
                const oldDiscount = document.querySelector('.cart__summary__discount-block');

                if (oldDiscount) {
                    currentTotalWrapper.parentElement.removeChild(oldDiscount);
                }

                currentTotalWrapper.parentElement.appendChild(discountBlock);
            }

        }

        return discountBlock
    }

    static getURLParams(paramOfCart: ParamOfCart) {
        const params = new URLSearchParams(window.location.search.slice(1))
        const value = params.get(paramOfCart)
        return value
    }

    static createURLCart(key: ParamOfCart, value: string) {
        const url = window.location.origin
        const params = new URLSearchParams(window.location.search.slice(1))
        const hash = window.location.hash
        const pathname = window.location.pathname
        const newUrl = new URL(url)

        if (params.has(key)) {
            params.set(key, value)
        }
        else {
            params.append(key, value)
        }

        newUrl.hash = hash
        newUrl.search = params.toString()
        newUrl.pathname = pathname
        window.history.pushState({}, "", newUrl)
    }

    static calculateNumberOfPages = (allCountOfGoods:number, countGoodsOnPage:number) => {
        const countPages =  Math.ceil(allCountOfGoods/countGoodsOnPage);

        localStorage.setItem('countOfPagesOnCart',countPages.toString());

        return countPages;
    }

    static setPageNumber = (selector: string, quantity: number) => {

        let pageNumber = Number(CartServices.getURLParams('page')) || 1;
        const lastPage = Number(localStorage.getItem('countOfPagesOnCart'))

        if (pageNumber > lastPage && lastPage > 0) {
            pageNumber = lastPage
        }

        let countOfGoodsInCart = 0;
        let countItemsOnPage = 3;
        const cartStateJewelryStore = localStorage.getItem('cartStateJewelryStore');
        let countOfItemsOnCartPage = CartServices.getURLParams('items');
        const cartCountTotalJewelryStore = localStorage.getItem('cartCountTotalJewelryStore')

        if (CartServices.getURLParams('items')) {
            if (Number(CartServices.getURLParams('items')) > Number(countOfItemsOnCartPage)) {
                countOfItemsOnCartPage = cartCountTotalJewelryStore
                pageNumber = lastPage
            }
        }

        if(cartStateJewelryStore!==null){
            countOfGoodsInCart =  (JSON.parse(cartStateJewelryStore).length);
        }

        if(countOfItemsOnCartPage!==null){
            countItemsOnPage = Number(countOfItemsOnCartPage);
        }

        const countOfPagesInCart= CartServices.calculateNumberOfPages(countOfGoodsInCart,countItemsOnPage);

        if(pageNumber+quantity>0 && pageNumber+quantity<=countOfPagesInCart) {
            pageNumber += quantity;
        }

        const numberPageValue = document.querySelector(`.${selector}`)
        if(numberPageValue instanceof HTMLDivElement) numberPageValue.textContent = pageNumber.toString();
        CartServices.createURLCart('page', pageNumber.toString())

        return pageNumber;
    }
}