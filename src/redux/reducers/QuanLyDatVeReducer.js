import {
  CANCEL_BOOKING,
  CHANGE_TAB,
  CHANGE_TAB_ACTIVE,
  RENDER_CINEMAROOM_DETAIL,
  SELECT_SEAT,
} from "../actions/types/QuanLyDatVeTypes";

const stateDefault = {
  cinemaRoomDetail: {},
  arrSelectingSeats: [],
  activeKey: 1,
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case RENDER_CINEMAROOM_DETAIL: {
      state.cinemaRoomDetail = action.cinemaRoomDetail;
      return { ...state };
    }
    case SELECT_SEAT: {
      let arrUpdateSeats = [...state.arrSelectingSeats];
      let index = arrUpdateSeats.findIndex(
        (selectingSeat) => selectingSeat.maGhe === action.selectingSeat.maGhe
      );

      if (index !== -1) {
        arrUpdateSeats.splice(index, 1);
      } else {
        arrUpdateSeats.push(action.selectingSeat);
      }
      state.arrSelectingSeats = arrUpdateSeats;
      return { ...state };
      // return { ...state, arrSelectingSeats: [] };
    }
    case CANCEL_BOOKING: {
      console.log(`arrSelectingSeats`, state.arrSelectingSeats);
      return { ...state, arrSelectingSeats: [] };
    }
    case CHANGE_TAB: {
      state.activeKey = 2;
      return { ...state };
    }
    case CHANGE_TAB_ACTIVE: {
      state.activeKey = 1;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
