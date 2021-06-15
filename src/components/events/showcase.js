import Card from './card';
import {useState, useEffect, useCallback} from 'react';
import {events} from '../../config/URL';
import axios from 'axios';
import '../../styles/showcase.css';

const CONFIG_PAGINATE=20;

const Showcase=(props)=>{
    const [allEvents, setAllEvents] = useState([]);
    const [eventsCat, setEventsCat] = useState(0);
    const [eventType, setEventsType] = useState(0);
    const [tags, setTags] = useState([]);
    const [mobileTags, setMobileTags] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const [pages, setPages] = useState({start:0, end:0})

    const AllEventsTagData=[{ 
        code:'ALL_EVENTS',
        head: 'All Events',
        url: 'https://www.codingninjas.com/assets-landing/images/all-events-unselected.svg',
        selectedUrl: 'https://www.codingninjas.com/assets-landing/images/all-events-selected.svg'
    },
    {
        head: 'Webinars',
        code: 'WEBINAR',
        url: 'https://www.codingninjas.com/assets-landing/images/webinar-unselected.svg',
        selectedUrl: 'https://www.codingninjas.com/assets-landing/images/webinar-selected.svg',
    },
    {
        head: 'Coding Events',
        code:'CODING_EVENT',
        url: 'https://www.codingninjas.com/assets-landing/images/coding-events-unselected.svg',
        selectedUrl: 'https://www.codingninjas.com/assets-landing/images/coding-events-selected.svg',
    },
    {
        head: 'Bootcamp Events',
        code:'BOOTCAMP_EVENT',
        url: 'https://files.codingninjas.in/bootcamp_events_unselected-5397.png',
        selectedUrl: 'https://files.codingninjas.in/bootcamp_events_selected-5397.png',
    },
    {
        head: 'Workshop',
        code:'WORKSHOP',
        url: 'https://files.codingninjas.in/workshop_unselected-5395.png',
        selectedUrl: 'https://files.codingninjas.in/workshop_selected-5395.png',
    }
];
    const subEventsTagData=[
        {
            head:'Upcoming',
        },
        {
            head:'Archived',
        },{
            head:'All Time Favorites',
        },
    ]

    const makeReq= async (eventType, eventCat, tagList=[], offset=1)=>{
        // console.log({
        //     eventType,
        //     eventCat,
        //     tagList, offset,
        // })
        await axios({
            url: events.getEvents,
            method:'GET',
            params:{
                event_category: eventType,
                event_sub_category:eventCat,
                tag_list: tagList.join(', '),
                offset: offset,
            }
        })
        .then(res=>{
            // console.log(res.data.data.events);
            var tmp=res.data.data.events || []
            setAllEvents(tmp);
            setPages({
                start:0,
                end:CONFIG_PAGINATE
            })
        }).catch(err=>{
            console.log(err.message);
        })
    }

    useEffect(()=>{
        makeReq(AllEventsTagData[eventsCat].code,subEventsTagData[eventType].head,tags,0);
    },[eventsCat, eventType, tags]);

    const handleTags=(item, mobile=false)=>{
        var index, tmp;
        if(mobile){
            index=mobileTags.indexOf(item);
            tmp=mobileTags;
            if(index>-1){
                tmp.splice(index,1);
            }else{
                tmp.push(item);
            }
            console.log(tmp);
            setMobileTags([...tmp]);
        }
        else{
            index=tags.indexOf(item);
            tmp=tags;
            if(index>-1){
                tmp.splice(index,1);
            }else{
                tmp.push(item);
            }
            setTags([...tmp]);
        }
        // console.log(tmp);
    }

    const checkInclude=(item, mobile=false)=>{
        var index;
        if(mobile){
            index=mobile.indexOf(item);
        }
        else{index=tags.indexOf(item);}
        return index>-1;
    }

    const displayTags = (props.allTags || []).map((itm, idx)=>{
        return(
            <div className="showcaseTag" style={{background:checkInclude(itm)?'#fa7328':'#eee', color:checkInclude(itm)?"#fff":"#424242"}} key={idx} onClick={()=>handleTags(itm)}>
                {itm}
            </div>
        )
    })

    const displayTagsMobile = (props.allTags || []).map((itm, idx)=>{
        return(
            <div className="showcaseTag" style={{background:checkInclude(itm, mobileTags)?'#fa7328':'#eee', color:checkInclude(itm, mobileTags)?"#fff":"#424242"}} key={idx} onClick={()=>handleTags(itm, mobileTags)}>
                {itm}
            </div>
        )
    })

    const genCards=allEvents.slice(pages.start, pages.end).map((itm, idx)=>{
        return (<Card data={itm} key={idx}/>);
    })

    const allEventsTag=AllEventsTagData.map((itm, idx)=>{
        return (
            <div key={idx} onClick={()=>{setEventsCat(idx); setEventsType(0); setTags([]);}} style={{display:'flex', fontWeight:eventsCat===idx?700:400, color:eventsCat===idx?"#fa7328":"#9e9e9e", alignItems:'center', paddingRight:84, fontSize:19}}>
                <img src={idx==eventsCat?itm.selectedUrl:itm.url} style={{marginRight:8, width:20}}/>
                <span style={{textAlign:'left', width:'auto'}}>{itm.head}</span>
            </div>
        );
    })

    const subEventsTag=subEventsTagData.map((itm,idx)=>{
        return(
            <div onClick={()=>{setEventsType(idx);setTags([]);}} key={idx} style={{display:'flex', alignItems:'center', paddingRight:52, fontSize:17, fontWeight:eventType===idx?700:400, color:eventType===idx?"#fa7328":"#9e9e9e"}}>
                <span style={{textAlign:'left', maxWidth:250}}>{itm.head}</span>
            </div>
        )
    })

    const handleMobileClick=()=>{
        if(tags.length){
            setMobileTags(tags);
        }else{
            setMobileTags([]);
        }
        setOpenMenu(true);
    }

    const submitReq=()=>{
        setTags([...mobileTags]);
        setOpenMenu(false);
    }

    const handlePrevPage=()=>{
        if(pages.start>0){
            setPages({
                start: pages.start-CONFIG_PAGINATE,
                end: pages.end-CONFIG_PAGINATE
            });
        }
        console.log(pages);
    }

    const handleNextPage=()=>{
        if(pages.end<allEvents.length){
            setPages({
                start: pages.start+CONFIG_PAGINATE,
                end: pages.end+CONFIG_PAGINATE
            });
        }
        console.log(pages);
    }

    return(
        <div className="outerShowcaseWrapper">
            <div className="innerShowcaseWrapper">
                <div className="eventsSlider">{allEventsTag}</div>
                <div className="eventsSubSlider">{subEventsTag}</div>
                <div className="showCaseBody">
                    <div className="showcaseEventsCard">{
                        allEvents.length>0?
                            <div style={{display:'flex', alignItems:'flex-start', justifyContent:'stretch', flexWrap:'wrap', width:'100%'}}>{genCards}</div>
                        :tags.length===0?
                            "No Events Found"
                            :
                            "No Evenets Found with selected Tag"
                    }</div>
                    <div className="showcaseEventsTags">
                        <div className="tagsHeadline">TAGS</div>
                        <div className="tagContainer">
                            {
                                displayTags
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="paginator">
                <span onClick={handlePrevPage} className={pages.start>0?"navBtns":"navBtns disabled"}>
                    <img src="https://files.codingninjas.in/left-arrow-5581.svg" alt="Prev"></img>
                </span>
                <section className="paginatorMonitor">
                    <span>Page</span>
                    <span className="pageDisplay">
                        {Math.ceil((pages.end)/CONFIG_PAGINATE)}
                    </span>
                    <span>of {Math.ceil((allEvents.length)/CONFIG_PAGINATE || 1)}</span>
                </section>
                <span onClick={handleNextPage} className={pages.end<allEvents.length?"navBtns":"navBtns disabled"}>
                    <img src="https://files.codingninjas.in/right-arrow-5582.svg" alt="Next"></img>
                </span>
            </div>

            <div className="mobileDrawerBtn" onClick={handleMobileClick}>
                <img src="https://www.codingninjas.com/assets-landing/images/filter-events-wave.svg" className="mobileDrawerIcon"></img>
                <span className="mobileDrawerHead">Filter Events</span>
            </div>

            <div style={{display: openMenu?'flex':'none', background:'#fff', position:'fixed', width:'100%', height:'100%', top:0, left:0, right:0, bottom:0, zIndex:8278327387283}}>
                <div style={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
                    <div className="mobileDrawerPopUpBtn">
                        <img onClick={()=>setOpenMenu(false)} src="https://www.codingninjas.com/assets-landing/images/events-back.svg" style={{marginRight:30, width:24, height:24}}></img>
                        <div style={{fontSize:17, color:'#757575'}}>Filter Event</div>
                    </div>
                        <div className="tagContainer">
                            {
                                displayTagsMobile
                            }
                        </div>
                    <div className="drawerApplyBtn" onClick={submitReq}> Apply Filters </div>
                </div>
            </div>
        </div>
    )
}

export default Showcase;