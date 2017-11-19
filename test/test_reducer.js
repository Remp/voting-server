import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe("reducer", () => {
    it("handle SET_ENTRIES", () => {
        const initialState = new Map();
        const action = {type: "SET_ENTRIES", entries: ["Trainspotting"]}
        const state = reducer(initialState, action);
        expect(state).to.equal(fromJS({
            entries: ["Trainspotting"]
        }))
    });
    it("handler NEXT", () => {
        const initialState = fromJS({
            entries: ["Trainspotting", "28 Days Later"]
        });
        const action = {type: "NEXT"};
        const state = reducer(initialState, action);
        expect(state).to.equal(fromJS({
            vote: {
                pairs: ["Trainspotting", "28 Days Later"]
            },
            entries: []
        }))
    })
    it("handle VOTE", () => {
        const initialState = fromJS({
            vote: {
                pairs: ["Trainspotting", "28 Days Later"]
            },
            entries: []
        });
        const action = {type: "VOTE", entry: "Trainspotting"};
        const state = reducer(initialState, action);
        expect(state).to.equal(fromJS({
            vote: {
                pairs: ["Trainspotting", "28 Days Later"],
                tally: {
                    Trainspotting: 1
                }
            },
            entries: []
        }))
    })
    it("initialized with undefined", () => {
        const action = {type: "SET_ENTRIES", entries: ["Trainspotting"]};
        const state = reducer(undefined, action);
        expect(state).to.equal(fromJS({
            entries: ["Trainspotting"]
        }))
    })
    it("final test", () => {
        const actions = [
            {type: "SET_ENTRIES", entries: ["Trainspotting", "28 Days Later"]},
            {type: "NEXT"},
            {type: "VOTE", entry: "Trainspotting"},
            {type: "VOTE", entry: "28 Days Later"},
            {type: "VOTE", entry: "Trainspotting"},
            {type: "NEXT"}
        ];
        const state = actions.reduce(reducer, new Map());
        expect(state).to.equal(fromJS({
            winner: "Trainspotting"
        }))
    })
})