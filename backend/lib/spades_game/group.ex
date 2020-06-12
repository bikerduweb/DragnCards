defmodule SpadesGame.Group do
  @moduledoc """
  Represents a player inside a game of spades.
  They will have a hand of cards, a bid etc.
  """
  alias SpadesGame.{Group,Card}

  @derive Jason.Encoder
  defstruct [:id, :name, :type, :controller, :cards]

  use Accessible

  @type t :: %Group{
    id: String.t(),
    name: String.t(),
    type: :hand | :deck | :discard | :play,
    controller: String.t(),
    cards: [Card.t()]
  }

  @doc """
  new/4: Create a new player with an empty hand.
  """
  @spec new(String.t(), String.t(), :hand | :deck | :discard | :play, String.t()) :: Group.t()
  def new(id, name, type, controller) do
    %Group{
      id: id,
      name: name,
      type: type,
      controller: controller,
      cards: [Card.new_test1(),Card.new_test2(),Card.new_test3(),Card.new_test3(),Card.new_test3(),Card.new_test3()],
    }
  end

  @spec empty(Group.t()) :: Group.t()
  def empty(group) do
    %Group{group | cards: []}
  end

end








