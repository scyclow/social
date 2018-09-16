// @flow

import { omit } from 'lodash'
import { createReducer } from 'utils/redux'
import { type Action, type Dispatch, type GetState } from 'types/redux'


type Job = {
  action: Action<*>,
  executionTime: number,
  timeoutId: TimeoutID,
  id: number | string,
};

export type SchedulerState = {
  jobs: {
    [string | number]: Job
  }
};

const defaultState: SchedulerState = {
  jobs: {}
}

const SCHEDULE_JOB = 'scheduler/SCHEDULE_JOB'
const MARK_JOB_COMPLETE = 'scheduler/MARK_JOB_COMPLETE'
const HANDLE_OUTSTANDING_JOBS = 'scheduler/HANDLE_OUTSTANDING_JOBS'


export const actions = {
  schedule(action: Action<*>, ms: number) {
    return (dispatch: Dispatch) => {
      const id = Math.random()

      const timeoutId = setTimeout(() => {
        dispatch(action)
        dispatch(actions.markJobComplete(id))
      }, ms)

      const executionTime = Date.now() + ms

      dispatch({
        type: SCHEDULE_JOB,
        payload: {
          action,
          timeoutId,
          id,
          executionTime
        }
      })
    }
  },

  markJobComplete(id: number | string) {
    return (dispatch: Dispatch, getState: GetState) => {
      const { scheduler } = getState()
      const job = scheduler.jobs[id]
      if (job) clearTimeout(job.timeoutId)
      dispatch({
        type: MARK_JOB_COMPLETE,
        payload: { id }
      })
    }
  },
  handleOutstandingJobs() {
    return (dispatch: Dispatch, getState: GetState) => {
      const { scheduler } = getState()
      const jobs = Object.keys(scheduler.jobs).reduce((incomplete, jobId) => {
        const job = scheduler.jobs[jobId]
        const now = Date.now()

        if (job.executionTime < now) {
          dispatch(job.action)
          dispatch(actions.markJobComplete(jobId))
          return omit(incomplete, jobId)
        } else {
          const ms = job.executionTime - now
          const timeoutId = setTimeout(() => {
            dispatch(job.action)
            dispatch(actions.markJobComplete(jobId))
          }, ms)

          return {
            ...incomplete,
            [jobId]: { ...job, timeoutId }
          }
        }
      }, {})

      dispatch({
        type: HANDLE_OUTSTANDING_JOBS,
        payload: { jobs }
      })
    }
  }
};

export const reducer = createReducer({
  [SCHEDULE_JOB]: (state: SchedulerState, { payload: { action, timeoutId, id, executionTime } }: Action<*>) => {
    return {
      ...state,
      jobs: {
        ...state.jobs,
        [id]: { action, timeoutId, id, executionTime }
      }
    }
  },
  [MARK_JOB_COMPLETE]: (state: SchedulerState, { payload }: Action<*>) => {
    return {
      ...state,
      jobs: omit(state.jobs, [payload.id.toString()])
    }
  },
  [HANDLE_OUTSTANDING_JOBS]: (state: SchedulerState, { payload }: Action<*>) => {
    return {
      ...state,
      jobs: payload.jobs
    }
  }
}, defaultState)
