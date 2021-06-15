import '../../styles/cards.css';
import useViewport from '../../hooks/viewport';
// import {useState, useEffect} from 'react';

const Card=({data})=>{
    const {width} = useViewport();
    const breakPoint=720;

    // useEffect(()=>{
    //     var dt=new Date(1e3*data?.end_time);
    //     var curr = new Date();
    //     //Immediate registration of nearby time would not be allow
    //     // console.log(curr,dt, data?.end_time)
    //     // console.log((dt-curr), data.registration_status);
    //     if((dt-curr)<200000){
    //         setIsArchive(true);
    //     }
    //     console.log(isArchive);
    // });

    const isArchived=()=>{
        var dt=new Date(1e3*data?.end_time);
        var curr = new Date();
        if((dt-curr)>200000){
            return false;
        }
        return true;
    }

    const getEndTime=()=>{
        var mth=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var end=data?.registration_end_time;
        var date=new Date(end*1e3);
        var day=date.getDate()
        var month=mth[date.getMonth()];
        var am='AM';
        var hh=date.getHours();
        var mm=date.getMinutes();
        if(hh>12){
            am='PM';
            hh=hh%12;
        }
        hh=hh?hh:12
        day=('0' + day).slice(-2)
        hh=('0' + hh).slice(-2)
        mm=('0' + mm).slice(-2)

        return day+' '+month+', '+hh+':'+mm+am;
    }

    const getStartTime=()=>{
        var mth=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var start=data?.event_start_time;
        var date=new Date(1e3*start);
        var day=date.getDate()
        var month=mth[date.getMonth()];
        var am='AM';
        var hh=date.getHours();
        var mm=date.getMinutes();
        var year=date.getFullYear();
        if(hh>12){
            am='PM';
            hh=hh%12;
        }
        hh=hh!==0?hh:12;
        day=('0' + day).slice(-2)
        hh=('0' + hh).slice(-2)
        mm=('0' + mm).slice(-2)

        return hh+':'+mm+' '+am+', '+day+' '+month+' '+year;
    }


    const genProfiles= (data.registered_users?.top_users||[]).map((itm, idx)=>{
        return (
            <div key={idx}>
                <img title={itm.name} src={itm.image_url} style={{borderRadius:'50%', width:22, height:22, border:'1px solid #fff'}}></img>
            </div>
        );
    })
    return (
        <div style={{width:width<=breakPoint?'100%':'47%', cursor:'pointer',minWidth:'200px', maxWidth:'500px', borderRadius:'4px', float:'left', marginRight:width<=breakPoint?0:'10px', marginBottom:width<=breakPoint?40:20, flexGrow:0, flexShrink:1, display:'flex', flexDirection:'column', justifyContent:'stretch', boxShadow:'0 1px 19px 0 rgb(0 0 0 / 7%)'}}>
            <section style={{height:'160px'}}>
                <div style={{height:'100%', position:'relative'}}>
                    <div style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', opacity:0.2, backgroundImage:'linear-gradient(-180deg,rgba(3,3,3,0),#010101)'}}></div>
                    <img src={data.cover_picture} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'4px', borderBottomLeftRadius:0, borderBottomRightRadius:0}}></img>
                        {
                            !isArchived()?
                            <div style={{position:'absolute', fontSize:'12px', color:'#121212', background:'#fff', padding:'7px 13px', borderRadius:'2px', bottom:7, right:7, boxShadow:'0 1px 11px 0 rgb(0 0 0 / 11%)'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <span className="circle"></span>
                                <div style={{margin:0}}>
                                    Registrations <strong>open</strong> till <strong>{getEndTime()}</strong>
                                </div>
                            </div>
                            </div>
                            :
                                null
                        }
                </div>
            </section>

            <header style={{padding:'20px 16px'}}>
            <section>
                <div style={{margin:'0 0 9px', fontSize:'18px', letterSpacing:'0.2px', fontWeight:700, minHeight:'50px', textAlign:'left'}}>
                    {data.name}
                </div>
            </section>

            <section style={{display:'flex', width:'100%', paddingBottom:10, borderBottom:'1px solid #f3f3f3', justifyContent:'space-around'}}>
                <div style={{display:'flex', width:'50%', flexDirection:'column', alignItems:'flex-start', marginRight:'16px'}}>
                    <span style={{color:'#757575', fontWeight:400, marginRight:5, fontSize:13}}>Starts on</span>
                    <span style={{overflowWrap:'break-word', textAlign:'left', color:'#212121', fontWeight:600, fontSize:'14px'}}>{getStartTime()}</span>
                </div>
                <div style={{display:'flex', width:'33.33%', flexDirection:'column', alignItems:'flex-start',marginRight:'16px'}}>
                    <span style={{color:'#757575', fontWeight:400, marginRight:5, fontSize:13}}>Entry Fee</span>
                    <span style={{color:'#212121', textAlign:'left', fontWeight:600, fontSize:'14px'}}>{data.fees?data?.currency+' '+data.fees:"FREE"}</span>
                </div>
                <div style={{display:'flex', width:'33.33%', flexDirection:'column', alignItems:'flex-start', marginRight:'16px'}}>
                    <span style={{color:'#757575', fontWeight:400, marginRight:5, fontSize:13}}>Venue</span>
                    <span style={{color:'#212121', textAlign:'left', fontWeight:600, fontSize:'14px'}}>{data.venue}</span>
                </div>
            </section>

            <section style={{textAlign:'left',marginTop:12, fontSize:14, height:50, color:'#616161', textOverflow:'ellipsis', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical'}}>
                {data.short_desc}
            </section>

            <section style={{display:'flex', flexWrap:'wrap', marginTop:20}}>
                {
                    (data.card_tags||[]).map((tag, idx)=>{
                        return(
                            <div key={idx} style={{color:'#616161', marginRight:8, marginBottom:8, background:'#eee', borderRadius:3, padding:'4px 14px', fontSize:12}}>{tag}</div>
                        )
                    })
                }
            </section>
            </header>

            <div style={{padding:'9px 0 9px 19px', display:'flex', justifyContent:'space-between', borderTop:'1px solid hsla(0,0%,59.2%,.1)', minHeight:30}}>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                    <div style={{display:'flex', marginBottom:4}}>{genProfiles}</div>
                    {
                        data.registered_users.show_users_count?
                            <div style={{color:'#757575', fontSize:13}}>and <strong>{data.registered_users.other_users_count}</strong> others registered</div>
                        :
                            null
                    }
                </div>
                {
                    !isArchived()?
                    <div>
                        <img src="https://files.codingninjas.in/0000000000001272.png" height={30}/>
                    </div>
                    :
                        null
                }
            </div>
        </div>
    )
}

export default Card;