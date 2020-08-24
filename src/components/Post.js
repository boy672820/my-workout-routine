import React, {Component} from 'react'
import './post.css'


class Post extends Component {

    render() {
        return (
            <ul className="list">

                <li className="item">
                    <div className="main">
                        <h6 className="excercise">Squat</h6>
                        <ul className="sets">
                            <li className="set">
                                <p className="reps"><span className="1set-squat-reps">10</span>Reps</p>
                                <p className="weight"><span className="1set-squat-weight">150</span>Kg</p>
                                <button className="init-current-set 1set-squat-init hidden" data-set="1"data-exercise="squat" data-reps="10" data-weight="150">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="2set-squat-reps">9</span>Reps</p>
                                <p className="weight"><span className="2set-squat-weight">150</span>Kg</p>
                                <button className="init-current-set 2set-squat-init hidden" data-set="2"data-exercise="squat" data-reps="9" data-weight="150">2세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="3set-squat-reps">9</span>Reps</p>
                                <p className="weight"><span className="3set-squat-weight">140</span>Kg</p>
                                <button className="init-current-set 3set-squat-init hidden" data-set="3"data-exercise="squat" data-reps="9" data-weight="140">3세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="4set-squat-reps">8</span>Reps</p>
                                <p className="weight"><span className="4set-squat-weight">140</span>Kg</p>
                                <button className="init-current-set 4set-squat-init hidden" data-set="4"data-exercise="squat" data-reps="8" data-weight="140">4세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="5set-squat-reps">8</span>Reps</p>
                                <p className="weight"><span className="5set-squat-weight">130</span>Kg</p>
                                <button className="init-current-set 5set-squat-init hidden" data-set="5"data-exercise="squat" data-reps="8" data-weight="130">5세트 수정</button>
                            </li>
                        </ul>
                    </div>

                    <div className="sub">
                        <textarea name="memo" className="memo"></textarea>
                    </div>
                </li>

                <li className="item">
                    <div className="main">
                        <h6 className="excercise">Deadlift</h6>
                        <ul className="sets">
                            <li className="set">
                                <p className="reps"><span className="1set-deadlift-reps">6</span>Reps</p>
                                <p className="weight"><span className="1set-deadlift-weight">185</span>Kg</p>
                                <button className="init-current-set 1set-deadlift-init hidden" data-set="1"data-exercise="Deadlift" data-reps="6" data-weight="185">5세트 수정</button>
                            </li>
                        </ul>
                    </div>

                    <div className="sub">
                        <textarea name="memo" className="memo"></textarea>
                    </div>
                </li>

                <li className="item">
                    <div className="main">
                        <h6 className="excercise">Steaf-Leg Deadlift</h6>
                        <ul className="sets">
                            <li className="set">
                                <p className="reps"><span className="1set-steaflegdeadlift-reps">12</span>Reps</p>
                                <p className="weight"><span className="1set-steaflegdeadlift-weight">130</span>Kg</p>
                                <button className="init-current-set 1set-steaflegdeadlift-init hidden" data-set="1"data-exercise="steaflegdeadlift" data-reps="12" data-weight="130">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="2set-steaflegdeadlift-reps">12</span>Reps</p>
                                <p className="weight"><span className="2set-steaflegdeadlift-weight">130</span>Kg</p>
                                <button className="init-current-set 2set-steaflegdeadlift-init hidden" data-set="2"data-exercise="steaflegdeadlift" data-reps="12" data-weight="130">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="3set-steaflegdeadlift-reps">12</span>Reps</p>
                                <p className="weight"><span className="3set-steaflegdeadlift-weight">130</span>Kg</p>
                                <button className="init-current-set 3set-steaflegdeadlift-init hidden" data-set="3"data-exercise="steaflegdeadlift" data-reps="12" data-weight="130">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="4set-steaflegdeadlift-reps">12</span>Reps</p>
                                <p className="weight"><span className="4set-steaflegdeadlift-weight">130</span>Kg</p>
                                <button className="init-current-set 4set-steaflegdeadlift-init hidden" data-set="4"data-exercise="steaflegdeadlift" data-reps="12" data-weight="130">1세트 수정</button>
                            </li>
                        </ul>
                    </div>

                    <div className="sub">
                        <textarea name="memo" className="memo"></textarea>
                    </div>
                </li>

                <li className="item">
                    <div className="main">
                        <h6 className="excercise">Prone-Cobra</h6>
                        <ul className="sets">
                            <li className="set">
                                <p className="reps"><span className="1set-pronecobra-reps">10</span>Reps</p>
                                <p className="weight"><span className="1set-pronecobra-weight">0</span>Kg</p>
                                <button className="init-current-set 1set-pronecobra-init hidden" data-set="1"data-exercise="pronecobra" data-reps="10" data-weight="0">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="2set-pronecobra-reps">10</span>Reps</p>
                                <p className="weight"><span className="2set-pronecobra-weight">0</span>Kg</p>
                                <button className="init-current-set 2set-pronecobra-init hidden" data-set="2"data-exercise="pronecobra" data-reps="10" data-weight="0">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="3set-pronecobra-reps">10</span>Reps</p>
                                <p className="weight"><span className="3set-pronecobra-weight">0</span>Kg</p>
                                <button className="init-current-set 3set-pronecobra-init hidden" data-set="3"data-exercise="pronecobra" data-reps="10" data-weight="0">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="4set-pronecobra-reps">10</span>Reps</p>
                                <p className="weight"><span className="4set-pronecobra-weight">0</span>Kg</p>
                                <button className="init-current-set 4set-pronecobra-init hidden" data-set="4"data-exercise="pronecobra" data-reps="10" data-weight="0">1세트 수정</button>
                            </li>
                        </ul>
                    </div>

                    <div className="sub">
                        <textarea name="memo" className="memo"></textarea>
                    </div>
                </li>

                <li className="item">
                    <div className="main">
                        <h6 className="excercise">Bicycle-Maneuver</h6>
                        <ul className="sets">
                            <li className="set">
                                <p className="reps"><span className="1set-bicyclemaneuver-reps">15</span>Reps</p>
                                <p className="weight"><span className="1set-bicyclemaneuver-weight">0</span>Kg</p>
                                <button className="init-current-set 1set-bicyclemaneuver-init hidden" data-set="1"data-exercise="bicyclemaneuver" data-reps="15" data-weight="0">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="2set-bicyclemaneuver-reps">15</span>Reps</p>
                                <p className="weight"><span className="2set-bicyclemaneuver-weight">0</span>Kg</p>
                                <button className="init-current-set 2set-bicyclemaneuver-init hidden" data-set="2"data-exercise="bicyclemaneuver" data-reps="15" data-weight="0">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="3set-bicyclemaneuver-reps">15</span>Reps</p>
                                <p className="weight"><span className="3set-bicyclemaneuver-weight">0</span>Kg</p>
                                <button className="init-current-set 3set-bicyclemaneuver-init hidden" data-set="3"data-exercise="bicyclemaneuver" data-reps="15" data-weight="0">1세트 수정</button>
                            </li>
                            <li className="set">
                                <p className="reps"><span className="4set-bicyclemaneuver-reps">15</span>Reps</p>
                                <p className="weight"><span className="4set-bicyclemaneuver-weight">0</span>Kg</p>
                                <button className="init-current-set 4set-bicyclemaneuver-init hidden" data-set="4"data-exercise="bicyclemaneuver" data-reps="15" data-weight="0">1세트 수정</button>
                            </li>
                        </ul>
                    </div>

                    <div className="sub">
                        <textarea name="memo" className="memo"></textarea>
                    </div>
                </li>

            </ul>
        )
    }
}

export default Post