import { createAction, ActionType, createReducer } from 'typesafe-actions';

// typesafe-actions를 사용하면 as const를 사용할 필요가 없다.
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

// 액션 생성 함수
export const increase = createAction(INCREASE)();
// () => ({ type: INCREASE })
export const decrease = createAction(DECREASE)();
// () => ({ type: DECREASE })
export const increaseBy = createAction(INCREASE_BY)<number>();
// (payload: number) => ({ type: INCREASE_BY, payload })
// 액션의 페이로드로 들어가는 값은 Generic을 사용하여 정할 수 있다.
// 액션의 페이로드에 아무것도 필요 없다면 Generic을 생략하면 된다.
/*
가끔씩 액션 생성 함수로 파라미터로 넣어주는 값과 액션의 페이로드 값이 완벽히 일치하지 않을 때가 있다.
예를 들어 다음과 같은 상황이 있다.
const createItem = (name: string) => ({ type: CREATE_ITEM, payload: { id: nanoid(), name } })

typesafe-actions는 아래와 같이 작성하면 된다.
const createItem = createAction(CREATE_ITEM).map(name => ({ payload: { id: nanoid(), name } }))
*/

// 액션의 객체 타입 만들기
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

// 4. 상태의 타입과 상태의 초기값 선언
type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

// createReducer로 리듀서 생성
// object map 형태
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }),
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
});

export default counter;

// 메서드 체이닝 방식을 사용해 코드를 여러줄 생략할 수 있다.
/* import { createStandardAction, createReducer } from 'typesafe-actions';

export const increase = createStandardAction('counter/INCREASE')();
export const decrease = createStandardAction('counter/DECREASE')();
export const increaseBy = createStandardAction('counter/INCREASE_BY')<number>(); // payload 타입을 Generics 로 설정해주세요.

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0
};

const counter = createReducer(initialState)
  .handleAction(increase, state => ({ count: state.count + 1 }))
  .handleAction(decrease, state => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload
  }));

export default counter; */
