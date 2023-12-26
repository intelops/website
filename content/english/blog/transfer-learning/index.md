---
title: "Transfer Learning: A new approach"
date: 2023-05-04
# description
description: "Transfer Learning a Machine Learning technique that involves using a pre-trained model of one task to bootstrap the learning process of a new task."
image: images/blog/transfer-learning/transfer.svg

cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: vishwas-prasanna

series: Machine Learning
categories:
- Neural Networks

tags:
  - Machine Learning
  - Transfer Learning

# image color code in undraw.co #FB7E44 
feedback: false
draft: false
---
Let\'s look at a human analogy to better understand what Transfer Learning is and how to use it. Imagine in a parallel universe, and for those who don't believe in it, their doppelgängers are currently having a heated debate about whether or not they exist.😆

Okay, back to the topic. Imagine a parallel universe where I'm a professional baseball player who has mastered the skills of hitting, fielding, and throwing. I also developed a set of techniques and strategies that are specific to Baseball. Now if I decide to try a new sport, such as Cricket. While the two sports are different, there are some transferable skills right, such as hand-eye coordination, agility, and timing, that I can bring from one sport to the other.  

In this analogy, the pre-trained model is like my existing skills and experience as a Baseball player, while the new task is like the new sport that I'm trying to learn. By leveraging my existing skills and experience, I can learn the new sport of cricket more quickly and efficiently than if I had started from scratch. Similarly, by using a pre-trained model as a starting point, machine learning algorithms can learn new tasks more quickly and efficiently than if they had to start from scratch.

#### Benefits of using Transfer Learning

- `Generalization`:  
It is always a good practice to train the model on large and diverse datasets and that's what most of the pre-trained models provide. Leveraging them and building your model on top of them can lead to a better generalization performance compared to training a model from scratch on a smaller dataset.
- `Limited Data`:  
How many times have we started to build neural network models from scratch and realized we are working with limited data and are scared of overfitting the model. With transfer learning, we can leverage the knowledge gained from a larger dataset to improve performance on a smaller dataset.
- `Compute Efficiency`:  
We all know how computationally expensive training a deep neural network from scratch can be if you have a large dataset. Transfer learning allows you to save time and computational resources.
- `Domain Adaptation`:  
A technique to improve the performance of a model on a target domain containing insufficient annotated data by using the knowledge learned by the model from another related domain with adequate labeled data. Transfer Learning can help in such cases by allowing us to adapt the pre-trained model to the new domain.

#### How to use Transfer Learning: An Example

##### VGG16

VGG16 is a strong type of Convolutional Neural Network that is capable of object detection and classification with 92.7% accuracy. It has 16 Layers that have weights, instead of a large number of hyperparameters to tune. If you want to learn more about VGG16 then [here](https://neurohive.io/en/popular-networks/vgg16/) is an amazing article that covers the ins and outs of the model.

##### Using VGG16 for binary classification task with two classes

Organize the training and validation data into subdirectories `path/to/train/directory` and `path/to/validation/directory` based on their classes.

```python
from tensorflow.keras.layers import Input, Dense, Flatten
from tensorflow.keras.models import Model
from tensorflow.keras.applications import VGG16
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# load the pre-trained VGG16 model, excluding the top dense layers
base_model = VGG16(weights='imagenet', include_top=False, input_tensor=Input(shape=(224, 224, 3)))

# freeze the layers in the base model to prevent overfitting
for layer in base_model.layers:
    layer.trainable = False

# add a custom top dense layers
x = Flatten()(base_model.output)
x = Dense(256, activation='relu')(x)
predictions = Dense(2, activation='softmax')(x)

# create a new model
model = Model(inputs=base_model.input, outputs=predictions)

# compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# create a data generator for image pre-processing and augmentation
datagen = ImageDataGenerator(rescale=1./255, shear_range=0.2, zoom_range=0.2, horizontal_flip=True)

# load and pre-process the training and validation data using the data generator
train_generator = datagen.flow_from_directory('path/to/train/directory', target_size=(224, 224), batch_size=32)
validation_generator = datagen.flow_from_directory('path/to/validation/directory', target_size=(224, 224), batch_size=32)

# train the model on the data
model.fit(train_generator, epochs=10, validation_data=validation_generator)
```

We compile the model and create an ImageDataGenerator to pre-process and augment the training and validation data. Finally, we train the model on the data using the fit method.

#### Conclusion

Overall, transfer learning can be a powerful tool for improving performance and efficiency in machine learning, especially in cases where we have limited data or computational resources. Happy Exploring.😃
