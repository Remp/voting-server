import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {makeStore} from '../src/store';

describe("store", () => {
    it("хранилище сконфигурировано с помощью правильного преобразователя", () => {
        const store = makeStore();
        expect(new Map()).to.equal(store.getState());

        const state = store.dispatch({type: "SET_ENTRIES", entries: ["Trainspotting", "28 Days Later"]});
        expect(state).to.equal(fromJs({
            entries: ["Trainspotting", "28 Days Later"]
        }))
    })
})