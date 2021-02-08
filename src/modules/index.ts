import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
// TypeScript 에서는 타입을 만들어서 내보내주어야 한다.
// 이 타입은 추후 우리가 컨테이너 컴포넌트를 만들 때 스토어에서 관리하고 있는 상태를 조회하기 위해 useSelector 를 사용 할 때 필요하다.
