import React from 'react'
import FormList from './FormWrap'
import { Store } from '@r-generator/core'
import './index.less'
const { useStore } = Store.Hooks

export default () => {
  const {
    target,
    moveableOptions,
    componentList,
    setGlobal: commonDispatch,
  } = useStore()
  return (
    <div className='form-design-area'>
      {componentList?.length === 0 ? (
        <div className="not-found-info">从左侧点选组件进行表单设计</div>
      ) : (
        <FormList
          target={target}
          componentList={componentList}
          moveableOptions={moveableOptions}
          setGlobal={commonDispatch}
        />
      )}
    </div>
  )
}