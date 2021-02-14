//
//  NotificationController.swift
//  treehacks WatchKit Extension
//
//  Created by Zeynep Tezduyar on 13/02/2021.
//

import WatchKit
import SwiftUI
import UserNotifications

class NotificationController: WKUserNotificationHostingController<NotificationView> {
    var card: Card!

    // The system calls the body property after the didReceive(_ notification:) method.
    override var body: NotificationView {
        NotificationView()
    }

    override func didReceive(_ notification: UNNotification) {
        guard let cardInfo = (notification.request.content.userInfo["card"] ?? [:]) as? [String: String] else {
            return
        }

        // Create a Card from the information in the notification.
//        card = Card(question: cardInfo["question"]!, answer: cardInfo["answer"]!, button: cardInfo["button"]!)
        card = Card(button: cardInfo["button"]!)

        notificationActions = [
            UNNotificationAction(identifier: "correct", title: "Correct", options: []),
            UNNotificationAction(identifier: "incorrect", title: "Incorrect", options: [])
        ]
    }
}
