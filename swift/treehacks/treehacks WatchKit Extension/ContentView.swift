//
//  ContentView.swift
//  treehacks WatchKit Extension
//
//  Created by Zeynep Tezduyar on 13/02/2021.
//

import SwiftUI
import UIKit

struct ContentView: View {
    
    // Observe changes to the flash card model and update the topic list accordingly.
    @ObservedObject var model: FlashCardModel

    var body: some View {
        List {
            ForEach(model.topics) { topic in
                NavigationLink(destination: CardList(topic: topic)) {
                    TopicCell(topic: topic)
                        .frame(height: 100.0)
                }
                .listRowPlatterColor(Color(topic.color))
            }
            .onMove { self.model.moveTopic(from: $0, to: $1) }
            .onDelete { self.model.deleteTopic(at: $0) }
        }
        .listStyle(CarouselListStyle())
        .navigationBarTitle(Text("WaterWatch"))
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView(model: FlashCardModel())
    }
}


extension Int: Identifiable {
    public var id: Int {
        self
    }
}

/// A topic that users can study.
struct Topic: Identifiable {
    let title: String
    let emoji: String
    let color: UIColor
    let message: String

    var cards: [Card]

    var id: String {
        title
    }
    var outside: String
}
struct vars {
    static var flushes:Int=3
    static var dishes:Int=20
    static var dishwasher:Int=0
    static var washingmachine:Int=1
    static var hands:Int=12
    static var shower:Int=25
}
struct Card: Codable {
//    let question: String
//    let answer: String
    let button: String
}

class FlashCardModel: ObservableObject {
    var flushes = vars.flushes
    var dishes = vars.dishes
    var dishwasher = vars.dishwasher
    var washingmachine = vars.washingmachine
    var hands = vars.hands
    var shower = vars.shower
    
    
    /// An array of topics that the user is currently studying.
    lazy var topics: [Topic] = [
        Topic(title: "Trees",
              emoji: "🌳",
              color: #colorLiteral(red: 0.0 / 255.0, green: 191.0 / 255.0,
                                   blue: 255.0 / 255.0, alpha: 0.9),
              message:" 21 🌳 planted",
              cards: [
                 //TODO: replace ... with db value
            ],
              outside: "Click to view"
        ),
        Topic(title: "Shower",
              emoji: "🚿",
              color: #colorLiteral(red: 19.0 / 255.0, green: 89.0 / 255.0,
                                   blue: 150.0 / 255.0, alpha: 0.9),
              message:"🚿 \(shower) minutes",
              cards: [
                Card(button: "Start Shower")
//                Card(question: "Question 1", answer: "Answer", button: "press")
            ],
              outside: "Click to shower"
        ),
        Topic(title: "Washing Hands",
              emoji: "🧼",
              color: #colorLiteral(red: 25.0 / 255.0, green: 25.0 / 255.0,
                                   blue: 112.0 / 255.0, alpha: 0.9),
              message:"🧼 \(hands) minutes",
              cards: [
                Card(button: "Start Washing")
//                Card(question: "Question 1", answer: "Answer", button: "press")
            ],
              outside: "Click to wash hands"
        ),
        Topic(title: "Flushing",
              emoji: "🚽",
              color: #colorLiteral(red: 30.0 / 255.0, green: 90.0 / 255.0,
                                   blue: 112.0 / 255.0, alpha: 0.9),
              message:"🚽 \(flushes) flushes",
              cards: [
                Card(button: "Add a Flush")
//                Card(question: "Question 1", answer: "Answer", button: "press")
               
            ],
              outside: "Click to flush"
        ),
        Topic(title: "Washing Dishes",
              emoji: "🧽",
              color: #colorLiteral(red: 0.0, green: 120.0 / 255.0,
                                   blue: 140.0 / 255.0, alpha: 0.9),
              message:"🧽 \(dishes) minutes",
              cards: [
                Card(button: "Start Washing Dishes")
//                Card(question: "Question 1", answer: "Answer", button: "press")
            ],
              outside: "Click to wash dishes by hand"
        ),
        Topic(title: "Dish Washer",
              emoji: "🍽️",
              color: #colorLiteral(red: 19.0 / 255.0, green: 89.0 / 255.0,
                                   blue: 150 / 255.0, alpha: 0.9),
              message:"🍽️ \(dishwasher) times",
              cards: [
                Card(button: "Add Dish Washer")
//                Card(question: "Question 1", answer: "Answer", button: "press")
            ],
              outside: "Click to use the dishwasher"
        ),
        Topic(title: "Washing Machine",
              emoji: "🧺",
              color: #colorLiteral(red: 70.0 / 255.0, green: 100.0 / 255.0,
                                   blue: 80.0 / 255.0, alpha: 0.9),
              message:"🧺 \(washingmachine) times",
              cards: [
                Card(button: "Add Dish Washing")
//                Card(question: "Question 1", answer: "Answer", button: "press")
            ],
              outside: "Click to use washing machine"
        )
    ]

    /// Moves the a topic to a new index.
    /// - Parameter source: The set of indexes that are being moved.
    /// - Parameter destination: The index of the destination.
    func moveTopic(from source: IndexSet, to destination: Int) {
        guard let index = source.first else {
            return
        }
        let element = topics.remove(at: index)
        topics.insert(element, at: destination)
    }

    /// Remove a topic at the particular index.
    /// - Parameter indices: The set of indexes to be removed.
    func deleteTopic(at indices: IndexSet) {
        indices.forEach { topics.remove(at: $0) }
    }
}

extension Card {
    /// A sample card used in the preview.
//    static let previewCard = Card(question: "6 × 7", answer: "42", button: "pressMe")
    static let previewCard = Card(button: "pressMe")
}

extension Topic {
    /// A sample topic used in the preview.
    static let previewTopic = Topic(title: "Trees", emoji: "🌳",
                                    color: .white, message:"how many trees?", cards: [Card.previewCard, Card.previewCard, Card.previewCard], outside: "click to view")
}



extension FlashCard {
    struct Side<Content: View> : View {
        let content: Content

        // A custom View Builder lets a caller use the view builder syntax when creating a Side.
        init(@ViewBuilder content: () -> Content) {
            self.content = content()
        }

        var body: some View {
            ZStack {
                Image(decorative: "CardBackground")
                    .resizable(capInsets:
                        .init(top: 5.0, leading: 5.0, bottom: 5.0, trailing: 5.0)
                )
                content
                    .padding()
            }
            .aspectRatio(4.0 / 2.8, contentMode: .fit)
            .font(Font.system(size: 40.0, design: .rounded))
            .foregroundColor(.black)
            .multilineTextAlignment(.center)
            .lineLimit(3)
            .minimumScaleFactor(0.5)
            .frame(height: 120.0)
        }
    }
}

struct CardSide_Previews: PreviewProvider {
    static var previews: some View {
        FlashCard.Side {
            Text("Side")
        }
    }
}

struct FlashCard: View {
    let card: Card

    /*
     The flash card consists of two Sides, and a Flip View that applies custom
     gestures and animations.
     */
    var body: some View {
//        FlipView(
//            Side {
//                Text(card.question)
//            },
//            Side {
//                Text(card.answer)
//            }
//        )
        Button(action: {
            // TODO: What to perform ACTION NEEDED TO ADD
            vars.flushes = 1
        }) {
            Text(card.button)
        }
    }
}

struct FlashCard_Previews: PreviewProvider {
    static var previews: some View {
        FlashCard(card: Card.previewCard)
    }
}


struct FlipView<Front: View, Back: View> : View {
    let front: Front
    let back: Back

    init(_ front: Front, _ back: Back) {
        self.front = front
        self.back = back
    }

    var body: some View {
        GeometryReader {
            FlipContent(front: self.front, back: self.back, size: $0.size)
        }
        .frame(height: 120.0)
    }
}

/**
 The FlipContent view applies a 3D rotation effect to the view when it is either
 tapped or dragged. To achieve the desired effect of the card having both a
 "front" and "back", when the view reaches 90 degrees of rotation the "front"
 view becomes translucent and the "back" view becomes opaque. This allows for
 seamlessly switching between the two views during the animation.
 */
private struct FlipContent<Front: View, Back: View> : View {
    let front: Front
    let back: Back
    let size: CGSize

    @State var angleState = TranslatingAngleState()

    var body: some View {
        ZStack(alignment: .center) {
            front
                .opacity(angleState.showingFront ? 1.0 : 0.0)
            back
                .scaleEffect(CGSize(width: -1.0, height: 1.0))
                .opacity(angleState.showingFront ? 0.0 : 1.0)
        }
        .frame(minWidth: 0.0, maxWidth: .infinity, alignment: .center)
        .rotation3DEffect(.degrees(angleState.total), axis: (0.0, 1.0, 0.0), perspective: 0.5)
        .onTapGesture {
            var currentState = self.angleState
            currentState.angle -= 180.0
            currentState.angleTranslation = 0.0
            withAnimation {
                self.angleState = currentState
            }
        }
        .gesture(
            DragGesture(minimumDistance: 0.0, coordinateSpace: .local)
                .onChanged { value in
                    let angle = Double((value.translation.width / self.size.width)) * 180.0
                    self.angleState.angleTranslation = angle
                }
                .onEnded { value in
                    let endAngle = Double((value.predictedEndTranslation.width / self.size.width)) * 180.0
                    let animation = self.$angleState.animation(.spring())

                    var currentState = self.angleState
                    if endAngle >= 90.0 {
                        currentState.angle += 180.0
                    } else if endAngle < -90.0 {
                        currentState.angle -= 180.0
                    }

                    currentState.angleTranslation = 0.0
                    animation.wrappedValue = currentState
                }
        )
    }
}

struct TranslatingAngleState {
    var angle: Double = 0.0
    var angleTranslation: Double = 0.0

    var total: Double {
        angle + angleTranslation
    }

    var clamped: Double {
        var clampedAngle = angleTranslation + angle
        while clampedAngle < 360.0 {
            clampedAngle += 360.0
        }
        return clampedAngle.truncatingRemainder(dividingBy: 360.0)
    }

    var showingFront: Bool {
        let clampedAngle = clamped
        return clampedAngle < 90.0 || clampedAngle > 270.0
    }
}

struct CardList: View {
    let topic: Topic
    @State var currentIndex = 0.0

    var body: some View {
        VStack {
            Text(topic.message)
                .multilineTextAlignment(.center)
                .font(.headline)
            Divider()
            ZStack {
                ForEach((0..<self.topic.cards.count).reversed()) { index in
                    // Apply the card transformation modifier to each card.
                    FlashCard(card: self.topic.cards[index])
                        .cardTransformed(self.currentIndex, card: index)
                }
            }
            /*
             The focusable and digital crown rotation modifiers allow for
             scrolling through each card with the Digital Crown.
             */
            .focusable(true)
            .digitalCrownRotation(
                $currentIndex.animation(),
                from: 0.0,
                through: Double(topic.cards.count - 1),
                by: 1.0,
                sensitivity: .low
            )
        }
        .navigationBarTitle(Text(topic.title))
    }
}

struct CardList_Previews: PreviewProvider {
    static var previews: some View {
        CardList(topic: Topic.previewTopic)
    }
}

struct CardModifier: ViewModifier {
    let rotation: Angle
    let zRotation: Angle
    let opacity: Double
    let allowInteraction: Bool

    init(
        rotation: Angle = .degrees(0.0),
        zRotation: Angle = .degrees(0.0),
        opacity: Double = 1.0,
        allowInteraction: Bool = false
    ) {
        self.rotation = rotation
        self.zRotation = zRotation
        self.opacity = opacity
        self.allowInteraction = allowInteraction
    }

    func body(content: Content) -> some View {
        content
            .rotationEffect(rotation)
            .rotation3DEffect(
                zRotation,
                axis: (1.0, 0.0, 0.0),
                anchor: .init(x: 0.5, y: 1.1),
                perspective: 0.1
            )
            .opacity(opacity)
            .allowsHitTesting(allowInteraction)
    }

    static func modifier(offset: Int) -> CardModifier {
        switch offset {
        // Current interactive card.
        case 0:
            return .init(allowInteraction: true)
        // The card right in front.
        case 1:
            return .init(zRotation: .degrees(-90.0), opacity: 1.0)
        // The card right behind.
        case -1:
            return .init(rotation: .degrees(-2.0))
        case -2:
            return .init(rotation: .degrees(3.0))
        case -3:
            return .init(rotation: .degrees(-1))
        default:
            break
        }

        if offset > 1 {
            return .init(zRotation: .degrees(-90.0), opacity: 0.0)
        } else {
            return .init(zRotation: .degrees(1.0), opacity: 0.0)
        }
    }
}

extension View {

    /// A view modifier which applies a custom 3D "card flip" transformation to the view.
    /// - Parameter stackOffset: The current offset into the stack.
    /// - Parameter card: The index of the card to be flipped.
    func cardTransformed(_ stackOffset: Double, card: Int) -> ModifiedContent<Self, CardModifier> {
        self.modifier(CardModifier.modifier(offset: Int(stackOffset.rounded()) - card))
    }
}

class InterfaceController: WKHostingController<TopicList> {

    override var body: TopicList {
        // Show the topic list using our Flash Card model.
        TopicList(model: FlashCardModel())
    }

}

struct TopicList: View {
    // Observe changes to the flash card model and update the topic list accordingly.
    @ObservedObject var model: FlashCardModel

    var body: some View {
        List {
            ForEach(model.topics) { topic in
                NavigationLink(destination: CardList(topic: topic)) {
                    TopicCell(topic: topic)
                        .frame(height: 100.0)
                }
                .listRowPlatterColor(Color(topic.color))
            }
            .onMove { self.model.moveTopic(from: $0, to: $1) }
            .onDelete { self.model.deleteTopic(at: $0) }
        }
        .listStyle(CarouselListStyle())
        .navigationBarTitle(Text("waterWatch"))
    }
}

struct TopicCell: View {
    var topic: Topic

    var body: some View {
        HStack {
            Text(topic.emoji)
                .font(.title)
            VStack(alignment: .leading) {
                Text(topic.title)
                    .font(.system(.headline, design: .rounded))
                Text(topic.outside)
            }
        }
    }
}

struct TopicList_Previews: PreviewProvider {
    static var previews: some View {
        TopicList(model: FlashCardModel())
    }
}


