| name        | machine-learning-core |
|-------------|----------------------|
| description | Machine Learning skill — Covers supervised & unsupervised learning, model building, evaluation, feature engineering, and practical workflows with Python code examples. |

---

# Machine Learning

## What This Is

Machine Learning (ML) is a subset of AI that enables systems to learn patterns from data and make predictions or decisions without explicit programming.

Use this when you're working on:

* Prediction problems (regression, classification)
* Pattern discovery (clustering)
* Data-driven decision systems
* Feature engineering & model optimization
* Real-world ML pipelines

---

## Installation

```bash
pip install numpy pandas scikit-learn matplotlib seaborn
```

---

## Quick Start

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression()
model.fit(X_train, y_train)

preds = model.predict(X_test)
print(accuracy_score(y_test, preds))
```

---

## Core Concepts

### Dataset Split

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
```

---

### Feature Scaling

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

---

### Model Training

```python
model.fit(X_train, y_train)
```

---

## Core Algorithms

### Linear Regression

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
```

---

### Logistic Regression

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
```

---

### Decision Tree

```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier()
model.fit(X_train, y_train)
```

---

### Random Forest

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()
model.fit(X_train, y_train)
```

---

### K-Means (Clustering)

```python
from sklearn.cluster import KMeans

model = KMeans(n_clusters=3)
model.fit(X)
```

---

## Model Evaluation

### Accuracy

```python
from sklearn.metrics import accuracy_score
accuracy_score(y_test, preds)
```

---

### Confusion Matrix

```python
from sklearn.metrics import confusion_matrix
confusion_matrix(y_test, preds)
```

---

### Classification Report

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, preds))
```

---

## Data Handling

```python
import pandas as pd

df = pd.read_csv("data.csv")
X = df.drop("target", axis=1)
y = df["target"]
```

---

## Training Tricks

### Cross Validation

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(model, X, y, cv=5)
```

---

### Hyperparameter Tuning

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

params = {'n_estimators': [50, 100]}
grid = GridSearchCV(RandomForestClassifier(), params)
grid.fit(X_train, y_train)
```

---

## Useful Patterns

### Save / Load Model

```python
import joblib

joblib.dump(model, "model.pkl")
model = joblib.load("model.pkl")
```

---

### Prediction

```python
preds = model.predict(X_test)
```

---

## Performance Notes

* Always clean and preprocess data
* Feature scaling improves many models
* Avoid overfitting (use validation)
* Use cross-validation for reliability
* More data > complex model (usually)

---

## When to Use What

* Linear Regression → continuous prediction
* Logistic Regression → binary classification
* Decision Tree → interpretable models
* Random Forest → strong general performance
* K-Means → clustering / grouping

---

## References

* https://scikit-learn.org/stable/
* https://www.kaggle.com/learn
* https://developers.google.com/machine-learning/crash-course
* https://towardsdatascience.com/

---

## Extras (Optional Exploration)

* Feature Engineering techniques
* Dimensionality Reduction (PCA)
* Ensemble Methods (Boosting, Bagging)
* ML Pipelines (sklearn.pipeline)
* Model Deployment (Flask, FastAPI)
