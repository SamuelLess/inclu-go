import numpy as np
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, ConstantKernel as C
from scipy.special import expit as sigmoid

def uncertainty_entropy(predicted_vote):
    p = sigmoid(predicted_vote)
    entropy = -p * np.log2(p) - (1 - p) * np.log2(1 - p)
    return entropy

def predict(user_prio, other_prios, current_vec):
    kernel = C(1.0, (1e-4, 1e1)) * RBF(1.0, (1e-4, 1e1))
    gp = GaussianProcessRegressor(kernel=kernel, n_restarts_optimizer=10)
    gp.fit(other_prios, current_vec)
    predicted_vote, sigma = gp.predict(user_prio, return_std=True)
    return predicted_vote[0], sigma[0]

def foo(user_prio, other_prios, current_vec, thr_val = 0.7, thr_sig = 0.02):
    pred, sigm = predict(user_prio, other_prios, current_vec)
    return pred >= thr_val, sigm <= thr_sig

# Beispieldaten
# Rollstuhlfahrer, Prothese, Sehbehindert
X_users = np.array([[1, 0, 1, 1, 0],
                    [0, 0, 1, 1, 0],
                    [0, 1, 0, 0, 1]])

location = {
    "small_stairs" : [0.8, 0.3, 0.1],
    "big_stairs" : [0.9, 0.5, 0.2],
    "construction_sight": [0.2, 0.1, 0.8]
}

# Beispiel neue Location für Nutzer
y_votes = location["small_stairs"]
new_user = np.array([[1, 1, 1, 1, 0]])

if __name__ == "__main__":
    # Prediction der Sicherheit und Severity
    print(predict(new_user, X_users, y_votes))