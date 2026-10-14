'use client'

import {useEffect,useRef,useState} from 'react'
import Link from 'next/link'
import type {ListViewClientProps} from 'payload'
import {CheckboxInput,DefaultListView,useConfig,useListDrawerContext,useListQuery,useSelection} from '@payloadcms/ui'
import type {Media} from '../payload-types'
import styles from './MediaList.module.css'

function MediaPreview({doc}:{doc:Media}) {
  const ref=useRef<HTMLDivElement>(null)
  const [visible,setVisible]=useState(false)
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting)){setVisible(true);observer.disconnect()}
    },{rootMargin:'100px'})
    if(ref.current)observer.observe(ref.current)
    return ()=>observer.disconnect()
  },[])
  const video=doc.mimeType?.startsWith('video/')
  return <div ref={ref} className={styles.preview}>
    {visible && doc.url && (video
      ? <video src={doc.url} muted playsInline preload="metadata" aria-label={doc.alt || doc.filename || 'Video'} onLoadedMetadata={event=>{event.currentTarget.currentTime=Math.min(0.1,event.currentTarget.duration || 0)}}/>
      : doc.mimeType?.startsWith('image/')
        // Existing R2 files retain their original URLs; previews do not create duplicate assets.
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={doc.thumbnailURL || doc.url} alt={doc.alt || ''} loading="lazy" decoding="async"/>
        : <span className={styles.fileType}>{doc.mimeType==='application/pdf'?'PDF':'FILE'}</span>)}
    {video && <span className={styles.videoBadge}>▶ Video</span>}
  </div>
}

function MediaGrid({enableRowSelections}:{enableRowSelections?:boolean}) {
  const {data}=useListQuery()
  const {isInDrawer,onSelect,onBulkSelect}=useListDrawerContext()
  const {selected,setSelection,toggleAll,selectAll}=useSelection()
  const {config}=useConfig()
  const selectable=enableRowSelections === true && (!isInDrawer || Boolean(onBulkSelect))
  return <div>
    {selectable && <div className={styles.selectAll}><CheckboxInput id="media-select-page" label="Select page" checked={selectAll==='allInPage'||selectAll==='allAvailable'} onToggle={()=>toggleAll()}/></div>}
    <div className={styles.grid}>
      {(data?.docs as Media[] | undefined)?.map(doc=>{
        const content=<><MediaPreview doc={doc}/><div className={styles.caption}><strong>{doc.filename}</strong><span>{doc.mimeType?.split('/')[1]?.toUpperCase()}{doc.width && doc.height ? ` · ${doc.width} × ${doc.height}`:''}</span></div></>
        return <article key={doc.id} className={styles.card} data-selected={selected.get(doc.id)||false}>
          {selectable && <div className={styles.checkbox}><CheckboxInput id={`media-select-${doc.id}`} label={`Select ${doc.filename}`} checked={Boolean(selected.get(doc.id))} onToggle={()=>setSelection(doc.id)}/></div>}
          {isInDrawer && onSelect
            ? <button type="button" className={styles.open} aria-label={`Choose ${doc.filename}`} onClick={()=>onSelect({collectionSlug:'media',doc,docID:String(doc.id)})}>{content}</button>
            : <Link className={styles.open} prefetch={false} href={`${config.routes.admin}/collections/media/${doc.id}`} aria-label={`Edit ${doc.filename}`}>{content}</Link>}
        </article>
      })}
    </div>
  </div>
}

export function MediaList(props:ListViewClientProps) {
  const [grid,setGrid]=useState(true)
  const {query,handleSortChange,handleWhereChange}=useListQuery()
  const mime=query.where?.mimeType
  const activeType=mime && !Array.isArray(mime)
    ? mime.equals==='application/pdf'?'pdfs':mime.contains==='image/'?'images':mime.contains==='video/'?'videos':'all'
    : 'all'
  const types={all:undefined,images:{contains:'image/'},videos:{contains:'video/'},pdfs:{equals:'application/pdf'}}
  const filterType=(type:keyof typeof types)=>{
    const where={...query.where}
    delete where.mimeType
    void handleWhereChange?.({...where,...(types[type]?{mimeType:types[type]}:{})})
  }
  return <DefaultListView {...props} Table={grid?<MediaGrid enableRowSelections={props.enableRowSelections}/>:props.Table} BeforeListTable={<>{props.BeforeListTable}<div className={styles.toolbar}>
    <div className={styles.toggle} role="group" aria-label="Media view"><button type="button" aria-pressed={grid} onClick={()=>setGrid(true)}>Grid</button><button type="button" aria-pressed={!grid} onClick={()=>setGrid(false)}>List</button></div>
    <div className={styles.toggle} role="group" aria-label="Media type">{([['all','All'],['images','Images'],['videos','Videos'],['pdfs','PDFs']] as const).map(([type,label])=><button key={type} type="button" aria-pressed={activeType===type} onClick={()=>filterType(type)}>{label}</button>)}</div>
    <label>Sort <select value={typeof query.sort==='string'?query.sort:typeof props.listPreferences?.sort==='string'?props.listPreferences.sort:'-createdAt'} onChange={event=>void handleSortChange?.(event.target.value)}><option value="-createdAt">Newest first</option><option value="createdAt">Oldest first</option><option value="filename">Filename A–Z</option><option value="-filename">Filename Z–A</option><option value="mimeType">File type</option></select></label>
  </div></>}/>
}
