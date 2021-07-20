import Chat from "../components/layout/chat";
import ChannelView from "../components/layout/channel-view";
import { findAccountByName } from "../services/account.service";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Channel (props) {
    let [ channelInfo, setChannelInfo ] = useState(null);
    let [ fetched, setFetched ] = useState(false);
    let { name } = useParams();

    useEffect(async () => {
        const res = await findAccountByName(name);
        if (res.success) {
            setChannelInfo(res.user);
        }

        setFetched(true);
    }, []);

    return (
        <div className="container">
            {
                fetched && (
                    <React.Fragment>
                        {
                            channelInfo != null && (
                                <React.Fragment>
                                    <ChannelView channel={channelInfo} />
                                    <Chat channel={channelInfo} {...props} />
                                </React.Fragment>
                            )
                        }

                        {
                            channelInfo == null && (
                                <h2>
                                    Channel not found
                                </h2>
                            )
                        }
                    </React.Fragment>
                )
            }
        </div>
    )
}