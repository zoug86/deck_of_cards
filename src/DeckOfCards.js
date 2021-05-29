import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './DeckOfCards.css';

const url = `https://deckofcardsapi.com/api/deck/new/shuffle`;


class DeckOfCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            drawnCards: []
        };
        this.drawCard = this.drawCard.bind(this);
    }
    async componentDidMount() {
        let response = await axios.get(url);
        //console.log(response.data.deck_id);
        this.setState({
            deck: response.data
        })

    }

    async drawCard() {
        try {
            let result = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`);
            console.log(result.data);
            if (!result.data.success) {
                throw new Error("No card remaining!");
            }
            let newCard = result.data.cards[0];
            this.setState(state => ({
                drawnCards: [...state.drawnCards,
                {
                    id: newCard.code,
                    image: newCard.image,
                    name: `${newCard.value} of ${newCard.suit}`

                }
                ]
            }))
        } catch (err) {
            alert(err);
        }

    }
    render() {
        const cards = this.state.drawnCards.map(card => (
            <Card key={card.id} name={card.name} image={card.image} />
        ));
        return (
            <div className="DeckOfCards">
                <h1 className="Deck-title"> ♦ CARD DEALER ♦</h1>
                <h2 className="Deck-title subtitle">♦ A little demo made with React ♦</h2>
                <button className="Deck-btn" onClick={this.drawCard}>DEAL ME A CARD! </button>
                <div className="Deck-card">{cards}</div>

            </div>
        )

    }
}

export default DeckOfCards;