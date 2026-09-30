import { lessonSpecs as m01m02 } from './lessonSpecsM01M02'
import { lessonSpecsM03M04 } from './lessonSpecsM03M04'
import { lessonSpecsM05M06 } from './lessonSpecsM05M06'
export type { LessonSpec } from './lessonSpecsM01M02'
export const lessonSpecs={...m01m02,...lessonSpecsM03M04,...lessonSpecsM05M06}
