import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { MovieListReducer } from "./reducers/MovieListReducer";

const rootReducer = combineReducers({
  CarouselReducer,
  MovieListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
