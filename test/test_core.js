import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';
import {setLimit_forTest} from '../src/constants';

describe("Application logic", () => {
    describe("setEntries", () => {
        it("добавляем записи к состоянию", () => {
            const state = new Map();
            const entries = List.of("Trainspotting", "28 Days Later");
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(new Map({
                entries: List.of("Trainspotting", "28 Days Later")
            }))
        });
        it("преобразует в immutable", () => {
            const state = new Map();
            const entries = ["Trainspotting", "28 Days Later"];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(new Map({
                entries: List.of("Trainspotting", "28 Days Later")
            }))
        });
    });
    describe("next", () => {
        it("берет для голосования следующие 2 записи", () => {
            const state = new Map({
                entries: List.of("Trainspotting", "28 Days Later", "Sunshine")
            });
            const nextState = next(state);
            expect(nextState).to.equal(new Map({
                vote: new Map({
                    pairs: List.of("Trainspotting", "28 Days Later"),                    
                }),
                entries: List.of("Sunshine")
            }))
        });
        it("помещает победителя в конец списка", () => {
            const state = new Map({
                vote: new Map({
                    pairs: List.of("Trainspotting", "28 Days Later"),
                    tally: new Map({
                        Trainspotting: 3,
                        "28 Days Later": 2
                    })
                }),
                entries: List.of("Sunshine", "127 hours", "Millions")
            })
            const nextState = next(state);
            expect(nextState).to.equal(new Map({
                vote: new Map({
                    pairs: List.of("Sunshine", "127 hours")
                }),
                entries: List.of("Millions", "Trainspotting")
            }))
        });
        it("при равности голосов добавляем обох в конец", () => {
            const state = new Map({
                vote: new Map({
                    pairs: List.of("Trainspotting", "28 Days Later"),
                    tally: new Map({
                        Trainspotting: 3,
                        "28 Days Later": 3
                    })
                }),
                entries: List.of("Sunshine", "127 hours", "Millions")
            })
            const nextState = next(state);
            expect(nextState).to.equal(new Map({
                vote: new Map({
                    pairs: List.of("Sunshine", "127 hours")
                }),
                entries: List.of("Millions", "Trainspotting", "28 Days Later")
            }))
        });
    });
    describe("vote", () => {
        it("создает результат голосования для данной записи", () => {
            setLimit_forTest(10);
            const voteState = new Map({
                vote: new Map({
                    pairs: List.of("Trainspotting", "28 Days Later"),
                })
            })
            const nextState = vote(voteState, "Trainspotting");
            expect(nextState).to.equal(new Map({
                vote: Map({
                    pairs: List.of("Trainspotting", "28 Days Later"),
                    tally: new Map({
                        Trainspotting: 1
                    })
                })
            }))
        });
        it("добавляем голос данной записи", () => {
            setLimit_forTest(10);            
            const voteState = new Map({
                vote: Map({
                    pairs: List.of("Trainspotting", "28 Days Later"),
                    tally: new Map({
                        Trainspotting: 3,
                        "28 Days Later": 2
                    })
                })
            });
            const nextState = vote(voteState, 'Trainspotting');
            expect(nextState).to.equal(new Map({
                vote: Map({
                    pairs: List.of("Trainspotting", "28 Days Later"),
                    tally: new Map({
                        Trainspotting: 4,
                        "28 Days Later": 2
                    })
                })
            }));
        });
        it('вызывает NEXT', () => {
            setLimit_forTest(6);            
            const voteState = new Map({
                vote: new Map({
                    pairs: List.of("Trainspotting", "28 Days Later"),
                    tally: new Map({
                        Trainspotting: 3,
                        "28 Days Later": 2
                    })
                }),
                entries: List.of("Sunshine", "127 hours", "Millions")
            })
            const newState = vote(voteState, 'Trainspotting');
            expect(newState).to.equal(new Map({
                vote: new Map({
                    pairs: List.of("Sunshine", "127 hours")
                }),
                entries: List.of("Millions", "Trainspotting")
            }))
        });
    })
})