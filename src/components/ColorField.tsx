'use client'

import {FieldError,FieldLabel,useField} from '@payloadcms/ui'
import type {TextFieldClientComponent} from 'payload'
import styles from './ColorField.module.css'

export const ColorField:TextFieldClientComponent=({field,readOnly})=>{
 const {path,value,setValue,showError,errorMessage}=useField<string>()
 const id=`field-${path}`
 return <div className="field-type text">
  <FieldLabel htmlFor={id} label={field.label} required={field.required}/>
  <FieldError path={path} showError={showError} message={errorMessage}/>
  <div className={styles.control}>
   <input id={id} type="color" value={value||'#000000'} disabled={readOnly} onChange={event=>setValue(event.target.value.toUpperCase())}/>
   <output htmlFor={id}>{value}</output>
  </div>
 </div>
}
