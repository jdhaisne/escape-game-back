export interface IBooking
{
    user_id: string;
    room_id: string;
    date_and_time: number;
    number_of_players: number;
    list_of_participants : [{
        firstname : string;
        lastname : string;
        birthday : string;
    }];
}