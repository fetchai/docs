import React from "react";
import {Tab as HeadlessTab} from '@headlessui/react'



function InfoIcon(props) {
    return (
        <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
            <circle cx="8" cy="8" r="8" strokeWidth="0"/>
            <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.75 7.75h1.5v3.5"
            />
            <circle cx="8" cy="4" r=".5" fill="none"/>
        </svg>
    )
}

function WarnIcon(props) {
    return (
        <svg viewBox="0 0 16 16" fill="red" aria-hidden="true" {...props}>
            <path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0zm0 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6zm1-9H7v6h2zm0 7H7v2h2z"/>
        </svg>
    )
}


export function Note({children}) {
    return (
        <div
            className="my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]">
            <InfoIcon
                className="mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200"/>
            <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
                {children}
            </div>
        </div>
    )
}

export function Warn({children}) {
    return (
        <div
            className="my-6 flex gap-2.5 rounded-2xl border border-red-500/20 bg-red-50/50 p-4 leading-6 text-red-900 dark:border-red-500/30 dark:bg-red-500/5 dark:text-red-200 dark:[--tw-prose-links-hover:theme(colors.red.300)] dark:[--tw-prose-links:theme(colors.white)]">
            <WarnIcon
                className="mt-1 h-4 w-4 flex-none fill-red-500 stroke-white dark:fill-red-200/20 dark:stroke-red-200"/>
            <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
                {children}
            </div>
        </div>
    )
}

export function Properties({children}) {


    return (
        <div className="my-6">
            <ul
                role="list"
                className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
            >
                {children}
            </ul>
        </div>
    );
}

export function Property({name, type, children}) {
    console.log(name, type, children)
    return (
        <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
            <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt className="sr-only">Name</dt>
                <dd>
                    <code>{name}</code>
                </dd>
                <dt className="sr-only">Type</dt>
                <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    {type}
                </dd>
                <dt className="sr-only">Description</dt>
                <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
                    {children}
                </dd>
            </dl>
        </li>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// leaving half as I think this will  be needed in future
export function Tabs({children, half = false}) {

    return (
        <div className={`rounded h-min overflow-auto ${half ? "w-full" : "w-full"}`}>


            <HeadlessTab.Group>
                <HeadlessTab.List className="flex space-x-1 rounded-xl p-1">
                    {React.Children.map(children, (child, index) => (
                        <HeadlessTab key={index} className={({selected}) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 bg-slate-100',
                                ' focus:outline-none focus:ring-2',
                                selected
                                    ? 'shadow'
                                    : 'text-white-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }>{child.props.heading}</HeadlessTab>
                    ))}
                </HeadlessTab.List>
                <HeadlessTab.Panels>
                    {React.Children.map(children, (child, index) => (
                        <HeadlessTab.Panel key={index}
                                   className={classNames('p-3 ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                   )}>{child.props.children}</HeadlessTab.Panel>
                    ))}
                </HeadlessTab.Panels>
            </HeadlessTab.Group>
        </div>
    )
}

export function Tab(props) {
    return <HeadlessTab {...props}/>
}

export function Row({children}){

    return ( <div className="flex pt-4">{children}</div>)

}

export function Col({children}){
return ( <div className="w-1/2">{children}</div>)
}

export function Section({children}){
    return ( <div className="my-32">{children}</div>)
}

export function ApiIntro({children}){
    return ( <div className="pb-4 pr-4">{children}</div>)
}

export function Tag({children}){
    return ( <div className="bg-green-100 border rounded w-fit">{children}</div>)
}